var router = require('express').Router();
var md5 = require('md5');
var multer = require('multer');
var path = require('path');
var mkdirp = require('mkdirp');
var sharp = require('sharp');

var User = require('../models/user');
var Image = require('../models/image');
var Chat = require('../models/chat');
var cache = require('../models/cache');
var repair = require('../utils/repair');
var saveLastActivity = require('../utils/saveLastActivity');


var storage = multer.diskStorage({
	destination: function(req, file, callback) {

		let email = null;
		if(req.body.email) {
			email = req.body.email;
		} else {
			email = cache.hashes[req.body.authhash].email;
		}

		let dest = './public/uploads/' + email;
		mkdirp(dest, function(err) {
			callback(null, dest);
		});
	},
	filename: function(req, file, callback) {
		let index = '';
		if(req.body.index) {
			index += req.body.index
		}

		callback(null, Date.now() + index + path.extname(file.originalname))
	}
});

var upload = multer({ storage: storage });

router.route('/user').post(upload.single('image'), (req, res) => {
	let user = req.body;
	user.image = req.file.filename;
	const smallName = req.file.filename.replace('.', 'sm.');
	sharp('./public/uploads/' + req.body.email + '/' + req.file.filename)
		.resize(160)
		.toFile('./public/uploads/' + req.body.email + '/' + smallName, (err, info) => {
			if (err) {
				console.log(err);
				return;
			}

			user.birthdate = user.year + '-' + repair(user.month) + '-' + repair(user.day);
			User.createUser(user, (err, data) => {
				console.log(data);
				if (err) {
					res.json({error: err});
					return
				}
				let hash = md5(data.insertId + req.body.email);
				cache.hashes[hash] = {id: data.insertId, expiration: Infinity};
				router.mailer.send('register', {
					to: req.body.email,
					subject: 'Sfingee.com - dokončení registrace',
					link: 'http://' + req.get('host') + '/finishregistration/' + hash,
					login: req.body.login
				}, (err) => {
					if (err) {
						res.send(err);
						return;
					}
					res.json(data);
				});
			});
	});
});

router.get('/authhash/:email/:password', (req, res) => {
	User.login(req.params, (err, data) => {
		if(err) {
			res.json({error: err});
			return
		}
		let hash = md5(data + req.params.email + Date.now());
		cache.hashes[hash] = {id: data, expiration: Date.now() + 300000, email: req.params.email};
		saveLastActivity(hash);
		res.json({authhash: hash});
	});
});

router.get('/users', (req, res) => {

	if(!checkHash(req.query.authhash, res)) return;

	User.getUsers(req.query, cache.hashes[req.query.authhash].id, (err, data) => {
		if(err) {
			console.log(err);
			res.json({error: err});
			return
		}

		res.json(
			data.map( (user, index) => {
				user.lastActivity = 0;
				for(let hash in cache.hashes) {
					if(cache.hashes[hash].id == user.id) {
						user.lastActivity = cache.hashes[hash].lastActivity;
						return user;
					}
				}
				return user;
			})
		);
	});
});

router.get('/user/:authhash', (req, res) => {

	if(!checkHash(req.params.authhash, res)) return;

	User.getUser(cache.hashes[req.params.authhash].id, (err, data) => {
		Image.getUnlocked(data.id, (err, unlockedData) => {
			data.unlocked = unlockedData.map((row) => { return row['image_id'] });
			res.json(data);
		});
	})
});

router.post('/forgottenPasswordEmail', (req, res) => {
	User.getRenewHash(req.body.email, (err, data) => {
		if(err) {
			res.json({error: err});
			return
		}

		router.mailer.send('renew', {
			to: req.body.email,
			subject: 'Sfingeee.com - obnovení hesla',
			bcc: 'info@sfingee.com',
			link: 'http://' + req.get('host') + '/renewpassword/' + data,
		}, (err) => {
			if(err) {
				console.log(err);
				res.json({error: err});
				return;
			}
		});

		res.json(data);
	});
});

router.put('/user', (req, res) => {

	let method = null;
	if(req.body.password) {
		method = 'setPassword';
	} else {
		console.log(req.body);
		if(!checkHash(req.body.authhash, res)) return;
		req.body.id = cache.hashes[req.body.authhash].id;
		delete(req.body.authhash);
		if(req.body.year && req.body.month && req.body.day) {
			req.body.birthdate = req.body.year + '-' + repair(req.body.month) + '-' + repair(req.body.day);
			delete(req.body.year);
			delete(req.body.month);
			delete(req.body.day);
		}
		method = 'updateUser';
	}

	User[method](req.body, (err) => {
		if(err) {
			console.log(err);
			res.json({error: err});
			return;
		}
		res.json({status: 'ok'});
	});
});

router.get('/chats/:authhash/:online', (req, res) => {

	if(!checkHash(req.params.authhash, res)) return;

	const userId = cache.hashes[req.params.authhash].id;
	Chat.getMessages(userId, (err, data) => {
		if(err) {
			console.log(err);
			res.json({error: err});
			return;
		}

		if(Object.keys(data).length) {
			User.getUsers({id: Object.keys(data), online: req.params.online}, null, (err, usersData) => {
				if (err) {
					console.log(err);
					res.json({error: err});
					return;
				}

				let users = {};
				let chats = {};
				for (let i = 0; i < usersData.length; i++) {
					const id = usersData[i].id;
					users[id] = usersData[i];
					if(data[id][data[id].length - 1]) {
						users[id].locked = data[id][data[id].length - 1][2] == '{{LOCKED}}';
					}
					if(data[id]) chats[id] = data[id];
				}

				res.json({chats: chats, users: users});
			});
		} else {
			res.json({chats: {}, users: {}});
		}
	});

});

router.get('/profile/:id', (req, res) => {

	User.getUser(req.params.id, (err, data) => {

		if(err) {
			res.json({error: err});
			console.log(err);
			return;
		}

		if(data == null) {
			res.json({error: {code: 'NOT_FOUND'}});
			return;
		}

		Image.getByUser(data.id, (err, imageData) => {
			if(err) {
				res.json({error: err});
				console.log(err);
				return;
			}

			data.images = imageData;
			for(let hash in cache.hashes) {
				if(cache.hashes[hash].id == data.id) {
					data.lastActivity = cache.hashes[hash].lastActivity;
					break;
				}
			}
			res.json(data);
		});
	});
});

let uploadedFiles = [];

router.route('/images').post(upload.single('photos'), (req, res) => {

	if(!checkHash(req.body.authhash, res)) return;

	uploadedFiles.push(req.file.filename);

	const smallName = req.file.filename.replace('.', 'sm.');

	sharp('./public/uploads/' + cache.hashes[req.body.authhash].email + '/' + req.file.filename)
		.resize(160)
		.toFile('./public/uploads/' + cache.hashes[req.body.authhash].email + '/' + smallName, (err, info) => {
			if(err) {
				console.log(err);
				return;
			}
			if(req.body.index == req.body.count-1) {
				Image.insert({files: uploadedFiles, userId: cache.hashes[req.body.authhash].id}, (err, data) => {

					uploadedFiles = [];
					if(err) {
						console.log(err);
						return;
					}

					Image.getByUser(cache.hashes[req.body.authhash].id, (err, data) => {
						if(err) {
							console.log(err);
							return;
						}
						res.json({images: data});
					});

				});
			} else {
				res.json({progess: req.body.index});
			}
	});
});

router.delete('/image/:authhash/:imageId/:isAvatar', (req, res) => {

	if(!checkHash(req.params.authhash, res)) return;

	Image.delete({id: req.params.imageId, isAvatar: req.params.isAvatar*1, userId: cache.hashes[req.params.authhash].id}, (err) => {
		if(err) {
			console.log(err);
			return;
		}
		res.json({status: 'ok'});
	});
});

router.put('/image', (req, res) => {
	if(!checkHash(req.body.authhash, res)) return;

	if(req.body.action == 'lock') {
		Image.setLock({id: req.body.id, brutto: req.body.credits}, (err, data) => {
			if (err) {
				console.log(err);
				return;
			}

			res.json({userId: cache.hashes[req.body.authhash].id});
		});
	}

	if(req.body.action == 'unlock') {
		Image.unlock({id: req.body.id, userId: cache.hashes[req.body.authhash].id}, (err, data) => {
			if (err) {
				res.json({error: err});
				console.log(err);
				return;
			}

			res.json({credits: data[0].credits});
		});
	}
});

router.put('/image/avatar/:authhash/:id', (req, res) => {

	if(!checkHash(req.params.authhash, res)) return;

	Image.setAvatar({id: req.params.id, userId: cache.hashes[req.params.authhash].id}, (err) => {
		res.json({status: 'ok'});
	});
});

function checkHash(hash, res) {
	if(cache.hashes[hash] == null) {
		res.json({error: {code: 'NOT_AUTHORIZED'}});
		return false;
	}
	saveLastActivity(hash);
	return true;
}

module.exports = router;

