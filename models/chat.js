
var db = require('./db');

var chat = {

	addMessage(conversationId, from, to, message, done) {

		if(conversationId == null) {

			if (from > to) {
				var values = [to, from];
			} else {
				var values = [from, to]
			}
			db("SELECT id FROM conversation WHERE user_id1=? AND user_id2=?", values, (err, results) => {
				if (results[0]) {
					return this._addMessage(results[0].id, from, to, message, done);
				} else {
					db("INSERT INTO conversation (user_id1,user_id2) VALUES (?,?)", values, (err, results) => {
						if (err) {
							done(err);
							return;
						}

						return this._addMessage(results.insertId, from, to, message, done);
					});
				}
			})
		} else {
			this._addMessage(conversationId, from, to, message, done);
		}
	},

	_addMessage(conversationId, from, to, message, done) {
		db("INSERT INTO message (conversation_id, from_user_id, to_user_id, message) VALUES (?,?,?,?)", [conversationId, from, to, message], (err, results) => {
			done(err, conversationId);
		})
	},

	getMessages(id, done) {

		const sql = `SELECT id FROM conversation c WHERE c.user_id1=? OR c.user_id2=?`;

		db(sql, [id, id], (err, rows) => {
			if (err) {
				done(err);
				return;
			}

			const sql = `SELECT * FROM message WHERE conversation_id=? ORDER BY id DESC LIMIT 100`;

			let result = {};

			for(let i = 0; i < rows.length; i++) {

				db(sql, [rows[i].id], (err, results) => {
					if (err) {
						done(err);
						return;
					}

					if(results && results[0] && results[0].readed) {
						results.unshift({'id': results[0].id+1,'from_user_id': results[0]['to_user_id'], 'to_user_id': results[0]['from_user_id'], 'message': '{{READED}}'})
					}

					results.sort((a, b) => { return a.id - b.id });

					for (let i = 0; i < results.length; i++) {

						if(!i) {
							if (results[i].from_user_id == id) {
								var from = results[i].to_user_id;
							} else {
								var from = results[i].from_user_id;
							}

							result[from] = [];
						}

						result[from].push([results[i].from_user_id, 0, results[i].message]);
					}

					if(i >= rows.length-1) done(false, result);
				});
			}
		});

	},

	setMessageReaded(from, to) {
		db('UPDATE message SET readed=1 WHERE from_user_id=? AND to_user_id=? ORDER BY id DESC LIMIT 1', [from, to], () => {});
	}

};

module.exports = chat;
