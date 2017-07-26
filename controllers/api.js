var router = require('express').Router();
var md5 = require('md5');
var multer = require('multer');
var path = require('path');
var mkdirp = require('mkdirp');

var User = require('../models/user');
var Chat = require('../models/chat');
var cache = require('../models/cache');
var repair = require('../utils/repair');



var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		let dest = './public/uploads/' + req.body.email;
		mkdirp(dest, function(err) {
			callback(null, dest);
		});
	},
	filename: function(req, file, callback) {
		callback(null, Date.now() + path.extname(file.originalname))
	}
});

var upload = multer({ storage: storage });

router.route('/user').post(upload.single('image'), (req, res) => {
	let user = req.body;
	user.image = req.file.filename;
	user.birthdate = user.year + '-' + repair(user.month) + '-' + repair(user.day);
	User.createUser(user, (err, data) => {
		console.log(data);
		if(err) {
			res.json({error: err});
			return
		}
		let hash = md5(data.insertId + req.body.email);
		cache.hashes[hash] = {id: data.insertId, expiration: Infinity};
		router.mailer.send('register', {
			to: req.body.email,
			subject: 'Sfinger.com - dokončení registrace',
			link: 'http://' + req.get('host') + '/finishregistration/' + hash,
			login: req.body.login
		}, (err) => {
			if(err) {
				res.send(err);
				return;
			}
		});
		res.json(data);
	});
});

router.get('/authhash/:email/:password', (req, res) => {
	User.login(req.params, (err, data) => {
		if(err) {
			res.json({error: err});
			return
		}
		let hash = md5(data + req.params.email + Date.now());
		cache.hashes[hash] = {id: data, expiration: Date.now() + 600000, lastActivity: Date.now()};
		res.json({authhash: hash});
	});
});

router.get('/users', (req, res) => {

	if(!checkHash(req.query.authhash, res)) return;

	User.getUsers(req.query, cache.hashes[req.query.authhash].id, (err, data) => {
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
	User.getUser(cache.hashes[req.params.authhash].id, (err, data) => {
		res.json(data);
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
			subject: 'Sfinger.com - obnovení hesla',
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
	User.setPassword(req.body, (err) => {
		if(err) {
			console.log(err);
			res.json({error: err});
			return;
		}
		res.json({status: 'ok'});
	});
});

router.get('/chats/:authhash', (req, res) => {

	if(!checkHash(req.params.authhash, res)) return;

	Chat.getMessages(cache.hashes[req.params.authhash].id, (err, data) => {
		if(err) {
			console.log(err);
			res.json({error: err});
			return;
		}
		res.json(data);
	});


});

function checkHash(hash, res) {
	console.log(hash);
	console.log(cache.hashes);
	if(cache.hashes[hash] == null) {
		res.json({error: {code: 'NOT_AUTHORIZED'}});
		return false;
	}
	cache.hashes[hash].lastActivity = Date.now();
	return true;
}

module.exports = router;

