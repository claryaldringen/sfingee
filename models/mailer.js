
var mailer = require('express-mailer');

function decorate(app) {
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
}

module.exports = decorate;
