
var express = require('express');
var bodyParser = require('body-parser');
var mailer = require('express-mailer');
var fs = require('fs');

var config = require('../config/config');

var app = express();

mailer.extend(app, config.smtp);

app.set('views', __dirname);
app.set('view engine', 'pug');

var re = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*/igm;

fs.readFile('page.txt', 'utf8', function (err,data) {
	if (err) {
		return console.log(err);
	}

	var match;

	while (match = re.exec(data)) {
		console.log(match[0]);
		if(match[0] != 'info@sex-seznamka.com') {
			app.mailer.send('email', {
				to: match[0], // REQUIRED. This can be a comma delimited string just like a normal email to field.
				subject: 'Re: Inzerát na portálu sex-seznamka.com', // REQUIRED.
				bcc: 'info@sfingee.com'
			}, function (err) {
				if (err) {
					// handle error
					console.log(err);
					return;
				}
			});
		}
	}

});

