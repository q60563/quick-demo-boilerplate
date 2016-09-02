var http = require('http'); 

var chalk = require('chalk');

var ioServer = require('./helpers/ioServer');
var server = http.createServer();

server.listen(3030);

ioServer.start(server);

/************************/
/* Event handle         */
/************************/
/*** ready            ***/
// readyInd();

/*** permitJoining    ***/
// permitJoiningInd(timeLift);

/*** error            ***/
// errorInd(msg);

/*** devIncoming      ***/
// devIncomingInd(permAddr);

/*** devStatus        ***/
// devStatusInd(permAddr, status);

/*** attrsChange      ***/
// attrsChangeInd(permAddr, data);

/**********************************/
/* start shepherd                 */
/**********************************/
var app = function () {
// start shepherd
/************************/
/* regReqHdlr handle    */
/************************/
    ioServer.regReqHdlr('getDevs', function (args, cb) { console.log(args); });
    ioServer.regReqHdlr('permitJoin', function (args, cb) { console.log(args); });
    ioServer.regReqHdlr('write', function (args, cb) { console.log(args); });
// cb(status, date)

    setInterval(function () {
        devIncomingInd({
            permAddr: 'AA:BB:CC:DD:EE',
            status: 'online',
            gads: { 
                'temp/0': {
                    type: 'Temperature',
                    auxId: 'temp/0',
                    value: '19'
                },
                'hum/0': {
                    type: 'Humidity',
                    auxId: 'hum/0',
                    value: '56'
                },
                'light/0': {
                    type: 'Light',
                    auxId: 'light/0',
                    value: true
                },
                'switch/0': {
                    type: 'Switch',
                    auxId: 'switch/0',
                    value: true
                } 
            }
        });
    }, 4000);

    setInterval(function () {
        devIncomingInd({
            permAddr: 'AA:BB:CC:DD:FF',
            status: 'online',
            gads: { 
                'illu/0': {
                    type: 'Illuminance',
                    auxId: 'illu/0',
                    value: '108'
                },
                'buzzer/0': {
                    type: 'Buzzer',
                    auxId: 'buzzer/0',
                    value: true
                },
                'flame/0': {
                    type: 'Flame',
                    auxId: 'flame/0',
                    value: true
                },
                'pir/0': {
                    type: 'Pir',
                    auxId: 'pir/0',
                    value: true
                }
            }
        });
    }, 5000);

    setInterval(function () {
        attrsChangeInd('AA:BB:CC:DD:EE', {
            type: 'Temperature',
            auxId: 'temp/0',
            value: '22'
        });
    }, 7000);

    // setInterval(function () {
    //     attrsChangeInd('AA:BB:CC:DD:EE', {
    //         type: 'Switch',
    //         auxId: 'switch/0',
    //         value: false
    //     });
    // }, 7000);

    // setInterval(function () {
    //     toastInd('Test');
    // }, 8000);

    setInterval(function () {
        devStatusInd('AA:BB:CC:DD:EE', 'offline');
    }, 10000);
};

/**********************************/
/* chalk funciton                 */
/**********************************/
function readyInd () {
    ioServer.sendInd('ready', {});
    console.log(chalk.green('[         ready ] '));
}

function permitJoiningInd (timeLift) {
    ioServer.sendInd('permitJoining', { timeLift: timeLift });
    console.log(chalk.green('[ permitJoining ] ') + timeLift + ' sec');
}

function errorInd (msg) {
    ioServer.sendInd('error', { msg: msg });
    console.log(chalk.red('[         error ] ') + msg);
}

function devIncomingInd (dev) {
     ioServer.sendInd('devIncoming', { dev: dev });
    console.log(chalk.yellow('[   devIncoming ] ') + '@' + dev.permAddr);
}

function devStatusInd (permAddr, status) {
    ioServer.sendInd('devStatus', { permAddr: permAddr, status: status });

    if (status === 'online')
        status = chalk.green(status);
    else 
        status = chalk.red(status);

    console.log(chalk.yellow('[     devStatus ] ') + '@' + permAddr + ', ' + status);
}

function attrsChangeInd (permAddr, gad) {
    ioServer.sendInd('attrsChange', { permAddr: permAddr, gad: gad });
    console.log(chalk.blue('[   attrsChange ] ') + '@' + permAddr + ', ' + JSON.stringify(gad));
}

function toastInd (msg) {
    ioServer.sendInd('toast', { msg: msg });

}

module.exports = app;
