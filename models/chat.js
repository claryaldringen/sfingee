
var db = require('./db');
var cache = require('./cache');

var chat = {

	addMessage(from, to, message, time, done) {

		if (from > to) {
			var values = [to, from];
		} else {
			var values = [from, to]
		}

		db("SELECT id,locked FROM conversation WHERE user_id1=? AND user_id2=?", values, (err, results) => {
			if(err) {
				done(err);
				return;
			}

			if (results[0]) {

				if(message == '{{CHAT_END}}') {
					this._chatEnd(results[0], from, to, (err) => {
						done(err);
						return;
					});
				}

				db("SELECT reciever_id,to_user_id FROM message WHERE conversation_id=? ORDER BY id DESC LIMIT 2", [results[0].id], (err, messages) => {

					if(err) {
						done(err);
						return;
					}

					let reciever = messages[0]['reciever_id'] ? messages[0]['reciever_id'] : to;

					db("SELECT chatprice FROM user WHERE id=?", [reciever], (err, users) => {

						let brutto = Math.floor((users[0].chatprice/36000)*time)/100;
						let netto = (Math.ceil(brutto*115)/100);

						if(messages[0]['to_user_id'] == to && to != reciever) {
							let found = false;
							for(let hash of cache.hashes) {
								if(cache.hashes[hash].id == to) {
									found = true;
									if (cache.hashes[hash].lastActivity < (Date.now() - 120000)) netto = 0;
									break;
								}
							}
							if(!found) netto = 0;
						}

						if(!brutto && to == messages[0]['to_user_id'] && results[0].locked && messages.length > 1) {
							netto = 100;
						} else if(to != messages[0]['to_user_id'] || brutto) {
							db("UPDATE conversation SET locked=0 WHERE id=?", [results[0].id], (err) => {
								if(err) {
									console.log(err);
								}
							})
						}

						if(netto > 0) {
							netto += 0.01;
							db("SELECT credits FROM user WHERE id IN (?) AND id != ?", [values, reciever], (err, credits) => {
								if(err) {
									done(err);
									return;
								}

								if(credits[0].credits < netto) {
									this._chatEnd(results[0], from, to, (err) => {
										done(err);
										return;
									});

									done({code: 'LOW_CREDIT'});
									return;
								}

								return this._addMessage(results[0], from, to, message, time, brutto, netto, reciever, done);
							});
						} else {
							return this._addMessage(results[0], from, to, message, time, brutto, netto, reciever, done);
						}
					});
				});
			} else {
				db("SELECT chatprice FROM user WHERE id=?", [to], (err, user) => {
					if (err) {
						done(err);
						return;
					}

					db("INSERT INTO conversation (user_id1,user_id2) VALUES (?,?)", values, (err, results) => {
						if (err) {
							done(err);
							return;
						}

						let brutto = Math.floor((user[0].chatprice/36000)*time)/100;
						let netto = (Math.ceil(brutto*115)/100);
						if(netto > 0) netto += 0.01;

						return this._addMessage({id: results.insertId, locked: 1}, from, to, message, time, brutto, netto, to, done);
					});
				});
			}
		});
	},


	_addMessage(conversation, from, to, message, time, brutto, netto, reciever, done) {
		db("INSERT INTO message (conversation_id, from_user_id, to_user_id, message, microtime, brutto, netto, reciever_id) VALUES (?,?,?,?,?,?,?,?)", [conversation.id, from, to, message, time, brutto, netto, reciever], (err, results) => {
			if(err) {
				done(err);
				return;
			}

			let result = {to: reciever, brutto: brutto, netto: netto, locked: conversation.locked};
			if(reciever == from) {
				result.from = to
			} else {
				result.from = from;
			}
			done(false, result);
		})
	},

	_chatEnd(conversation, from, to, done) {
		db("SELECT message FROM message WHERE conversation_id=? ORDER BY id DESC LIMIT 1", [conversation.id], (err, messages) => {
			if(err) {
				done(err);
				return;
			}

			if(messages[0].message != '{{CHAT_END}}') {
				return this._addMessage(conversation, from, to, '{{CHAT_END}}', 0, 0, 0, null, done);
			}

			done({code: 'CHAT_END_ALREADY_SENT'});
			return;
		});
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

	setMessageReaded(from, to, done) {
		db('UPDATE message SET readed=1 WHERE from_user_id=? AND to_user_id=? ORDER BY id DESC LIMIT 1', [from, to], done);
	}

};

module.exports = chat;
