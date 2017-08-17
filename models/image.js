
var db = require('./db');

const image = {

	insert(data, done) {

		const rows = data.files.map( (image, i) => {
			let imageParts = image.split('.');
			return([imageParts[0], imageParts[1], 0, data.userId]);
		});

		db("INSERT INTO image (name, extension, avatar, user_id) VALUES ?", [rows], done);
	},

	getByUser(userId, done) {
		db("SELECT * FROM image WHERE user_id=? ORDER BY avatar DESC, netto", [userId], done);
	},

	delete(data, done) {
		if(data.isAvatar) {
			db("UPDATE image SET avatar=1 WHERE user_id=? AND avatar=0 LIMIT 1", [data.userId], (err) => {
				if(err) {
					done(err);
					return;
				}
				db("DELETE FROM image WHERE id=?", [data.id], done);
			});
		} else {
			db("DELETE FROM image WHERE id=?", [data.id], done);
		}
	},

	setAvatar(data, done) {
		db("UPDATE image SET avatar=1 WHERE id=?", [data.id], (err) => {
			if(err) {
				done(err);
				return;
			}
			db("UPDATE image SET avatar=0 WHERE user_id=? AND id != ?", [data.userId, data.id], done);
		});
	},

	setLock(data, done) {
		const netto = Math.ceil(data.brutto*11.5)/10;
		db("UPDATE image SET brutto=?, netto=? WHERE id=?", [data.brutto, netto, data.id], done);
	},

	unlock(data, done) {
		db("SELECT brutto, netto, user_id FROM image WHERE id=?", [data.id], (err, image) => {
			if(err) {
				done(err);
				return;
			}

			db("SELECT credits FROM user WHERE id=?", [data.userId], (err, user) => {
				if(err) {
					done(err);
					return;
				}

				if(user[0].credits >= image[0].netto) {
					db("UPDATE user SET credits=credits+? WHERE id=?", [image[0].brutto, image[0]['user_id']], (err) => {
						if(err) {
							done(err);
							return;
						}

						db("UPDATE user SET credits=credits-? WHERE id=?", [image[0].netto, data.userId], (err) => {
							if(err) {
								done(err);
								return;
							}

							db("INSERT INTO `unlock` (user_id, image_id, brutto, netto) VALUES (?,?,?,?)", [data.userId, data.id, image[0].brutto, image[0].netto], (err) => {
								if(err) {
									done(err);
									return;
								}

								db("SELECT credits FROM user WHERE id=?", [data.userId], done);
							})
						});
					})
				} else {
					done({code: 'LOW_CREDIT'});
				}
			});
		});
	},

	getUnlocked(userId, done) {
		db("SELECT image_id FROM `unlock` WHERE user_id=?", [userId], done);
	}

};

module.exports = image;