
var express = require('express');
var bodyParser = require('body-parser');
var mailer = require('express-mailer');
var socketIo = require('socket.io');
var favicon = require('serve-favicon');
var path = require('path');

var config = require('./config/config');
var staticRouter = require('./controllers/static');
var apiRouter = require('./controllers/api');
var cache = require('./models/cache');
var Chat = require('./models/chat');
var User = require('./models/user');

var app = express();

app.use(function (req, res, next) {
	const host = req.get('host');
	if(host != 'sfingee.com' && host != 'localhost:8080') {
		res.redirect(301, 'https://sfingee.com' + req.path)
		return;
	}
	next();
});

mailer.extend(app, config.smtp);

apiRouter.mailer = app.mailer;

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', apiRouter);
app.use('/', staticRouter);
app.use(express.static('public', {maxage: 86400000}));
app.use(favicon(path.join(__dirname,'public','img','favicon.ico')));

app.use(function(req, res, next) {
	res.status(400);
	res.redirect('/')
});

var server = app.listen(process.env.PORT || 8080);
var io = socketIo(server);

io.on('connection', function(socket){
	console.log('a user connected');

	socket.on('fuck', (data) => {
		data = JSON.parse(data);
		if(cache.hashes[data.authhash]) {
			cache.hashes[data.authhash].socketId = socket.id;
		}
	});

	socket.on('chat message', (msg) => {

		let message = JSON.parse(msg);

		if (message.msg.indexOf('{{') === -1) {
			Chat.addMessage(message.from, message.to, message.msg, message.time, (err, data) => {
				if(err) {
					socket.emit('chat message', JSON.stringify({from: message.to, to: message.from, error: err, msg: '{{ERROR}}'}));
					if(err.code == 'LOW_CREDIT') {
						send(socket, message.to, JSON.stringify({to: message.to, msg: '{{CHAT_END}}'}));
						socket.emit('chat message', JSON.stringify({to: message.from, msg: '{{CHAT_END}}'}));
					}
					console.log(err);
					return;
				}

				send(socket, message.to, msg);

				if(data && data.locked && !data.brutto) {
					socket.emit('chat message', JSON.stringify({from: message.from, to: message.to, msg: '{{LOCKED}}'}));
				}

				if(data && data.to && data.netto) {
					User.transfer(data.from, data.to, data.brutto, data.netto, (err, balance) => {
						if(err) {
							console.log(err);
							return;
						}

						socket.emit('chat message', JSON.stringify({to: message.from, credit: balance[message.from], reciever: data.to, msg: '{{CREDIT}}'}));
						send(socket, message.to, JSON.stringify({to: message.to, credit: balance[message.to], reciever: data.to, msg: '{{CREDIT}}'}));
					});
				}

			});
		} else if (message.msg == '{{READED}}') {
			Chat.setMessageReaded(message.to, message.from, (err) => {
				if(err) {
					console.log(err);
					return;
				}
				send(socket, message.to, msg);
			});
		} else if(message.msg == '{{CHAT_END}}') {
			Chat.addMessage(message.from, message.to, message.msg, 0, (err) => {
				if(err) {
					console.log(err);
					return;
				}
				send(socket, message.to, msg);
			});
		}

		User.setLastActivity(message.from);
		for(let hash of cache.hashes) {
			if(cache.hashes[hash].id = message.from) {
				cache.hashes[hash].lastActivity = Date.now();
				break;
			}
		}
	});

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
});

function send(socket, to, msg) {
	for(let hash in cache.hashes) {
		if(cache.hashes[hash].id == to && cache.hashes[hash].lastActivity > (Date.now() - 300000)) {
			socket.broadcast.to(cache.hashes[hash].socketId).emit('chat message', msg);
			return;
		}
	}

}
