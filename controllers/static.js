var router = require('express').Router();
var path = require('path');
var User = require('../models/user');
var cache = require('../models/cache');

router.get(['/', '/app/*'], (req, res) => {
	res.sendFile(path.resolve(__dirname + '/../public/index.html'));
});

router.get('/termsofuse', (req, res) => {
	res.render('terms');
});

router.get('/privacypolicy', (req, res) => {
	res.render('privacy');
});

router.get('/finishregistration/:hash', (req, res) => {
	if(cache.hashes[req.params.hash]) {
		User.updateUser({id: cache.hashes[req.params.hash].id, active: 1}, (err) => {
			if(err) {
				res.redirect('/?mess=1');
				return
			}
			cache.hashes[req.params.hash].expiration = Date.now() + 3600*1000;
			res.redirect('/?mess=2');
		});
	} else {
		res.redirect('/?mess=3');
	}
});

router.get('/renewpassword/:hash', (req, res) => {
	User.checkRenewHash(req.params.hash, (err) => {
		if(err) {
			res.redirect('/');
			return;
		}

		res.render('index', {});
	})
});


module.exports = router;