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
    console('***sendInd*** ' + cmd + ' , data: ' + data);
};

IoServer.prototype.regReqHdlr = function (cmd, handler) {
    console('***regReqHdlr*** ' + cmd);
};

module.exports = IoServer;
