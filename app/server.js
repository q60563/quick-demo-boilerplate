var chalk = require('chalk');

var IoServer = require('./helpers/IoServer');

var ioServer = new IoServer();

// listen shepherd emit and call ioServer.sendInd()
// ioServer.sendInd('ready');
// ioServer.sendInd('permitJoining');
// ioServer.sendInd('devIncoming')
// ioServer.sendInd('devStatus')
// ioServer.sendInd('attrsChange')
 
var app = function () {
// start shepherd
};

module.exports = app;