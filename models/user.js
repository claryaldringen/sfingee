
var db = require('./db');
var bcrypt = require('bcrypt-node');


var user = {

	createUser(user, done) {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, null, (err, hash) => {
				if (err) {
					console.log(err);
					done(err);
					return;
				}
				db("INSERT INTO user (name,password,email,birthdate,sex, last_activity) VALUES (?,?,?,?,?,?)", [user.name, hash, user.email, user.birthdate, user.sex, new Date()], (err, results) => {
					if(err) {
						done(err);
						return;
					}

					this.createAvatar({userId: results.insertId, image: user.image}, (err, results2) => {
						results2.insertId = results.insertId;
						done(err, results2)
					});
				});
			});
		})
	},

	createAvatar(data, done) {
		let imageParts = data.image.split('.');
		db("INSERT INTO image (name, extension, avatar, user_id) VALUES (?,?,?,?)", [imageParts[0], imageParts[1], 1, data.userId], done);
	},

	updateUser(data, done) {
		console.log(data);
		let id = data.id;
		delete(data.id);
		if(data.hairLong) {
			data['hair_long'] = data.hairLong;
			delete(data.hairLong);
		}
		db("UPDATE user SET ? WHERE id = ?", [data, id], done);
	},

	login(user, done) {
		db("SELECT id, password FROM user WHERE email=? AND active > 0", [user.email], (err, results) => {
			if(results.length) {
				bcrypt.compare(user.password, results[0].password, (err, res) => {
					if (res) {
						done(false, results[0].id);
					} else {
						done({code: 'BAD_PASSWORD'});
					}
				});
			} else {
				done({code: 'EMAIL_NOT_FOUND'});
			}
		})
	},

	getUsers(data, userId, done) {

		if(data.id) {
			const sql = `SELECT u.id,u.name,u.email,u.birthdate,i.name AS image,i.extension 
			FROM user u 
			JOIN image i ON i.user_id=u.id AND i.avatar=1 
			WHERE u.id IN (?)`;

			db(sql, [data.id], done);
		} else {
			const sex = {
				'truefalse': 'sex=0 AND ',
				'falsetrue': 'sex=1 AND',
				'truetrue': '',
				'falsefalse': ''
			}[data.man + data.woman];

			let orientation = [];
			if(data.hetero && data.hetero == 'true') orientation.push(1);
			if(data.homo && data.homo == 'true') orientation.push(2);
			if(data.bi && data.bi == 'true') {
				orientation.push(3);
				orientation.push(4);
			}
			if(!orientation.length) {
				orientation = [1,2,3,4]
			}
			orientation.push(0);
			let date = '1970-01-01 01:00:00';
			if(data.online && data.online == 'true') {
				date = new Date(Date.now() - 300000);
			}

			const min = new Date(Date.now() - (data.maxage * 1 + 1) * 31556926000);
			const max = new Date(Date.now() - (data.minage * 1 - 1) * 31556926000);

			const sql = `SELECT u.id,u.name,u.email,u.birthdate,i.name AS image,i.extension 
			FROM user u 
			JOIN image i ON i.user_id=u.id AND i.avatar=1 
			WHERE ${sex} u.active > 0 AND birthdate BETWEEN ? AND ? AND u.id != ? AND orientation IN (?) AND last_activity > ?
			ORDER BY u.id DESC
			LIMIT ?,?
			`;

			console.log([min, max, userId, orientation, date, data.limit ? data.limit*1 : 0, 21]);
			db(sql, [min, max, userId, orientation, date, data.limit ? data.limit*1 : 0, 21], done);
		}
	},

	getRenewHash(email, done) {
		const sql = "UPDATE user SET hash=? WHERE email=?";
		let now = Date.now();
		db(sql, [now, email], (err, data) => {
			if(err) {
				done(err);
				return;
			}

			if(data.affectedRows) {
				done(false, now);
			} else {
				done({code: 'EMAIL_NOT_FOUND'});
			}

		});
	},

	checkRenewHash(hash, done) {
		const sql = "SELECT id FROM user WHERE hash=?";
		db(sql, hash, (err, data) => {
			if(err) {
				done(err);
				return;
			}

			done(data[0] == null)

		});
	},

	setPassword(data, done) {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(data.password, salt, null, (err, hash) => {
				if (err) {
					done(err);
					return;
				}

				const sql = "UPDATE user SET password=?,hash='' WHERE hash=?";
				db(sql, [hash, data.hash], (err, data) => {
					if (err) {
						done(err);
						return;
					}

					done(false)
				});
			});
		});
	},

	getUser(id, done) {
		const sql = `SELECT 
			u.id,u.name,birthdate,sex,orientation,relationship,tall,weight,experience,hair,eyes,account,
			show_weight AS showWeight,
			hair_long AS hairLong,
			description,email,credits,
			CONCAT(i.name,'.',i.extension) AS avatar
			FROM user u
			JOIN image i ON i.user_id=u.id AND avatar=1
      WHERE u.id=?`;

		db(sql, [id], (err, data) => {
			if (err) {
				done(err);
				return;
			}

			done(false, data[0]);
		});
	},

	setLastActivity(id) {
		db("UPDATE user SET last_activity=NOW() WHERE id=?", [id], () => {});
	}
};

module.exports = user;
