var mysql = require('mysql');


var config = require('../config/config');
var pool = mysql.createPool(config.db);



var query = function(sql, params, done) {
	pool.getConnection((err, connection) => {
		if (err) {
			done(err);
			return;
		}

		connection.query(sql, params, (err, results) => {
			connection.release();
			if (err) {
				done(err);
				return;
			}
			done(false, results);
		});
	});
};

module.exports = query;
