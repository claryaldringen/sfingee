
var express = require('express');
var bodyParser = require('body-parser');
var mailer = require('express-mailer');
var md5 = require('md5');

var db = require('./app/db');

var hashes = {};
var app = express();
var router = express.Router();

router.get('/', (req, res) => {
	res.json({message: 'Welcome to API'});
});

router.route('/user').post((req, res) => {
	db.createUser(req.body, (err, data) => {
		if(err) {
			res.json({error: err});
			return
		}
		let hash = md5(data.insertId + req.body.email);
		hashes[hash] = {id: data.insertId, expiration: Infinity};
		app.mailer.send('email', {
			to: req.body.email,
			subject: 'Sfinger.com - dokončení registrace',
			link: 'http://' + req.get('host') + '/finishregistration/' + hash,
			login: req.body.login
		}, (err) => {
			if(err) {
				console.log({error: err});
				res.send(err);
				return;
			}
		});
		res.json(data);
	});

});

router.get('/authhash/:email/:password', (req, res) => {
	db.login(req.params, (err, data) => {
		if(err) {
			res.json({error: err});
			return
		}
		let hash = md5(data.id + req.params.email + Date.now());
		hashes[hash] = {id: data.id, expiration: Date.now() + 600000};
		res.json({authhash: hash});
	});
});





mailer.extend(app, {
	from: 'info@freetech.cz',
	host: 'smtp.freetech.cz',
	secureConnection: false,
	port: 587,
	transportMethod: 'SMTP',
	auth: {
		user: 'info@freetech.cz',
		pass: '8cd40f7a8c2ac3dbf5531365c6a5d943'
	}
});


app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);

app.get('/finishregistration/:hash', (req, res) => {
	if(hashes[req.params.hash]) {
		db.setUser(hashes[req.params.hash].id, {active: 1}, (err) => {
			if(err) {
				console.log(err);
				res.render('index', {});
				return
			}
			res.render('index', {hash: req.params.hash});
			hashes[req.params.hash].expiration = Date.now() + 3600*1000;
		});
	} else {
		res.render('index', {});
	}
});

app.listen(process.env.PORT || 8080);