
var express = require('express');
var bodyParser = require('body-parser');
var mailer = require('express-mailer');
var md5 = require('md5');
var socketIo = require('socket.io');
var favicon = require('serve-favicon');
var path = require('path');

var config = require('./config/config');
var staticRouter = require('./controllers/static');
var apiRouter = require('./controllers/api');
var cache = require('./models/cache');
var Chat = require('./models/chat');

var app = express();

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

	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
		let message = JSON.parse(msg);

		console.log(message);

		if(message.msg.indexOf('{{') === -1) {
			if(message.from > message.to) {
				if(!cache.chats[message.to]) cache.chats[message.to] = {};
				Chat.addMessage(cache.chats[message.to][message.from], message.from, message.to, message.msg, (err, conversationId) => {
					cache.chats[message.to][message.from] = conversationId;
				});

			} else {
				if(!cache.chats[message.from]) cache.chats[message.from] = {};
				Chat.addMessage(cache.chats[message.from][message.to], message.from, message.to, message.msg, (err, conversationId) => {
					cache.chats[message.from][message.to] = conversationId;
				});
			}
		} else if(message.msg == '{{READED}}') {
			Chat.setMessageReaded(message.to, message.from);
		}
	});

	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});
