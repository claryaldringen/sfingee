
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

		const sql = `SELECT * FROM conversation c 
			JOIN message m ON m.conversation_id=c.id
			WHERE c.user_id1=? OR c.user_id2=?
			ORDER BY m.id`;

		db(sql, [id, id], (err, results) => {
			if (err) {
				done(err);
				return;
			}

			let result = {};
			let readed = {};

			for(let i = 0; i < results.length; i++) {

				if(results[i].user_id1 == id) {
					var from = results[i].user_id2;
				} else {
					var from = results[i].user_id1;
				}

				if(!result[from]) result[from] = [];

				result[from].push([results[i].from_user_id, 0, results[i].message]);

				readed[results[i].from_user_id + '-' + results[i].to_user_id] = results[i].readed;
			}

			for(let users in readed) {
				if(readed[users]) {
					let fromTo = users.split('-');
					if(result[fromTo[0]]) {
						result[fromTo[0]].push([fromTo[1], 0, '{{READED}}']);
					} else if(result[fromTo[1]]) {
						result[fromTo[1]].push([fromTo[1], 0, '{{READED}}']);
					}
				}
			}

			done(false, result);
		});
	},

	setMessageReaded(from, to) {
		db('UPDATE message SET readed=1 WHERE from_user_id=? AND to_user_id=? ORDER BY id DESC LIMIT 1', [from, to], () => {});
	}

};

module.exports = chat;
