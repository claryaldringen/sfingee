
var cache = require('../models/cache');
var User = require('../models/user');

var saveLastActivity = function(hash) {
	const now = Date.now();
	if(cache.hashes[hash].lastActivity + 120000 < now) {
		cache.hashes[hash].lastActivity = now;
		User.setLastActivity(cache.hashes[hash].id);
	}
}

module.exports = saveLastActivity;