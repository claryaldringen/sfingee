
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
		db("SELECT * FROM image WHERE user_id=? ORDER BY avatar DESC", [userId], done);
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
	}

};

module.exports = image;