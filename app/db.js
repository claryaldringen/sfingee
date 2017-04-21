var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');


var pool = mysql.createPool({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'myapi'
});

var db = {

	createUser(user, done) {
		pool.getConnection((err, connection) => {
			if (err) {
				console.log(err);
				done(err);
				return;
			}
			bcrypt.hash(user.password, null, null, (err, hash) => {
				if (err) {
					console.log(err);
					done(err);
					return;
				}
				connection.query("INSERT INTO user (login,password,email) VALUES (?,?,?)", [user.login, hash, user.email], (err, results) => {
					connection.release();
					if (err) {
						console.log(err);
						done(err);
						return;
					}
					done(false, results);
				});
			});
		});
	},

	setUser(id, data, done) {
		pool.getConnection((err, connection) => {
			if (err) {
				console.log(err);
				done(err);
				return;
			}
			connection.query("UPDATE user SET ? WHERE id = ?", [data, id], (err, results) => {
				connection.release();
				if (err) {
					console.log(err);
					done(err);
					return;
				}
				done(false, results);
			});
		});
	},

	login(user, done) {
		pool.getConnection((err, connection) => {
			if (err) {
				console.log(err);
				done(err);
				return;
			}

			connection.query("SELECT id, password FROM user WHERE email=?", [user.email], (err, results) => {
				connection.release();
				if (err) {
					console.log(err);
					done(err);
					return;
				}
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
			});
		});
	}

};


module.exports = db;