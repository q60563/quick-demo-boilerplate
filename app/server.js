var chalk = require('chalk');

var ioServer = require('./helpers/ioServer');

/************************/
/* Event handle         */
/************************/
// listen shepherd emit and call ioServer.sendInd()
/*** ready            ***/
// ioServer.sendInd('ready');
// console.log(ready());

/*** permitJoining    ***/
// ioServer.sendInd('permitJoining');
// console.log(permitJoining(timeLift));

/*** error            ***/
// ioServer.sendInd('error');
// console.log(error(msg));

/*** devIncoming      ***/
// ioServer.sendInd('devIncoming')
// console.log(devIncoming(permAddr));

/*** devStatus        ***/
// ioServer.sendInd('devStatus')
// console.log(devStatus(permAddr, status));

/*** attrsChange      ***/
// ioServer.sendInd('attrsChange')
// console.log(attrsChange(permAddr, data));

/**********************************/
/* start shepherd                 */
/**********************************/
var app = function () {
// start shepherd

/************************/
/* regReqHdlr handle    */
/************************/
// ioServer.regReqHdlr('getDevs', function (cb) {});
// ioServer.regReqHdlr('permitJoin', function (timeLeft, cb) {});
// ioServer.regReqHdlr('write', function (permAddr, auxId, value, cb) {});
// cb(status, date)

};

/**********************************/
/* chalk funciton                 */
/**********************************/
function ready () {
    return chalk.green('[         ready ] ');
}

function permitJoining (timeLift) {
    return chalk.green('[ permitJoining ] ') + timeLift + ' sec';
}

function error (msg) {
    return chalk.red('[         error ] ') + msg;
}

function devIncoming (permAddr) {
    return chalk.yellow('[   devIncoming ] ') + '@' + permAddr;
}

function devStatus (permAddr, status) {
    if (status === 'online')
        status = chalk.green(status);
    else 
        status = chalk.red(status);

    return chalk.yellow('[     devStatus ] ') + '@' + permAddr + ', ' + status;
}

function attrsChange (permAddr, data) {
    return chalk.blue('[   attrsChange ] ') + '@' + permAddr + ', ' + JSON.stringify(data);
}

module.exports = app;