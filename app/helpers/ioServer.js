var express = require('express'),
	http = require('http'),
	Io = require('socket.io');

var app = express(),
	server = http.createServer(app),
	io = new Io(server);

function IoServer () {}

IoServer.prototype.start = function (callback) {
	server.listen(3001);
};

IoServer.prototype.sendInd = function (cmd, data) {
    console.log('***sendInd*** ' + cmd + ' , data: ' + data);
};

IoServer.prototype.regReqHdlr = function (cmd, handler) {
    console.log('***regReqHdlr*** ' + cmd);
};

var ioServer = new IoServer();

module.exports = ioServer;
