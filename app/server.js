var http = require('http'); 
var chalk = require('chalk');
var MqttShepherd = require('mqtt-shepherd');
var _ = require('busyman');

var model = require('./model/model');
var ioServer = require('./helpers/ioServer');
var server = http.createServer();
var qserver = new MqttShepherd();

server.listen(3030);
ioServer.start(server);

qserver.start(function (err) {
    if (!err)
        showWelcomeMsg();
    else
        console.log(err);
});

var isDemoRunning = false;
var isPolling = false;

var startDemoApp = function () {
    isDemoRunning = true;
    var qnode1 = model.qnode1,
        qnode2 = model.qnode2,
        qnode3 = model.qnode3,
        qnode4 = model.qnode4;

    setTimeout(function () {
        toastInd('Device d01 will join the network');
        setTimeout(function () {
            qnode1.connect('mqtt://localhost', function () {});
        }, 3000);
    }, 100);

    setTimeout(function () {
        toastInd('Device d02 will join the network');
        setTimeout(function () {
            qnode2.connect('mqtt://localhost', function () {});
        }, 3000);
    }, 3500);

    setTimeout(function () {
        toastInd('Device d03 will join the network');
        setTimeout(function () {
            qnode3.connect('mqtt://localhost', function () {});
        }, 3000);
    }, 6000);

    setTimeout(function () {
        toastInd('Device d04 will join the network');
        setTimeout(function () {
            qnode4.connect('mqtt://localhost', function () {});
        }, 3000);
    }, 7000);

    setTimeout(function () {
        toastInd('You can click on a lamp or a buzzer');
    }, 11000);

    setTimeout(function () {
        toastInd('User will turn on the light switch');

    }, 17000);

    setTimeout(function () {
        toastInd('Illumination is less than 50 lux, light would be turned on');

    }, 29000);

    setTimeout(function () {
        toastInd('PIR sensed someone walking around, light would be turned on');

    }, 41000);

    setTimeout(function () {
        toastInd('Flame sensor detect the presence of a flame or fire, buzzer would be turned on');
    }, 53000);
};

var validGads = [ 'temperature', 'humidity', 'illuminance', 'onOffSwitch', 'buzzer', 'lightCtrl', 'presence', 'dOut' ];

function getDevInfo(clientId) {
    var qnode = qserver.find(clientId);
    if (!qnode)
        return;
    var permAddr = qnode.mac + '#' + qnode.clientId;
    var dumped = qnode.dump(),
        dev = {
            permAddr: permAddr,
            status: qnode.status,
            gads: {}
        };

    validGads.forEach(function (name) {
        if (dumped.so[name]) {
            _.forEach(dumped.so[name], function (gad, iid) {
                var auxId = name + '/' + iid,
                    type = getGadType(name, gad.appType),
                    val = getGadValue(qnode, name, iid);

                dev.gads[auxId] = {
                    type: type,
                    auxId: auxId,
                    value: val
                };
            });
        }
    });

    return dev;
}

var app = function () {
    setLeaveMsg();

    ioServer.regReqHdlr('getDevs', function (args, cb) { 
        // register your req handler, cb(err, data);
        var devs = {},
            recs = qserver.list();

        recs.forEach(function (rec) {
            var dev = getDevInfo(rec.clientId);

            if (!dev)
                return;
            devs[dev.permAddr] = dev;
        });

        setImmediate(function () {
            cb(null, devs);
        });
    });

    ioServer.regReqHdlr('permitJoin', function (args, cb) { 
        // register your req handler
        // cb(err, data);
        if (!isDemoRunning)
            startDemoApp();

        setImmediate(function () {
            qserver.permitJoin(args.time);
            cb(null, null);
        });
    });

    ioServer.regReqHdlr('write', function (args, cb) { 
        // args = { permAddr, auxId, value }
        // register your req handler
        // cb(err, data);

        var permSplit = _.split(args.permAddr, '#'),
            auxSplit = _.split(args.auxId, '/'),
            mac = permSplit[0],
            clientId = permSplit[1],
            oid = auxSplit[0],
            iid = auxSplit[1];

        cb(null, false);
    });

    /************************/
    /* Event handle         */
    /************************/
    /*** ready            ***/
    qserver.on('ready', function () {
        readyInd();
    });

    /*** error            ***/
    qserver.on('error', function (err) {
        errorInd(err.message);
    });

    /*** permitJoining    ***/
    qserver.on('permitJoining', function (joinTimeLeft) {
        permitJoiningInd(joinTimeLeft);
    });

    qserver.on('ind', function (msg) {
        var permAddr = msg.qnode ? (msg.qnode.mac + '#' + msg.qnode.clientId) : '';

        if (msg.type === 'devIncoming') {
            /*** devIncoming      ***/
            var devInfo = getDevInfo(msg.qnode.clientId)
            devIncomingInd(devInfo);
        } else if (msg.type === 'devStatus') {
            /*** devStatus        ***/
            devStatusInd(permAddr, msg.data);
            if (msg.qnode.clientId === 'd01' && !isPolling)
                startPolling(msg.qnode);
        } else if (msg.type === 'devChange') {
            // console.log('!!!!!!!!!!!!!!!!!!!!!1');
            // console.log(msg.data);
            /*** attrsChange      ***/
            var data = msg.data;
            var mainResource = mainResourceName(data.oid);

            if (!data.rid) {
                attrsChangeInd(permAddr, {
                    type: getGadType(data.oid, (data.oid === 'dOut') ? 'flame' : undefined),  // make flame sensor
                    auxId: data.oid + '/' + data.iid,
                    value: data.data[mainResource]
                });
            } else {
                attrsChangeInd(permAddr, {
                    type: getGadType(data.oid, (data.oid === 'dOut') ? 'flame' : undefined),  // make flame sensor
                    auxId: data.oid + '/' + data.iid,
                    value: data.data
                });
            }

            // data = { type, auxId, value }
        }
    });
};
/**********************************/
/* welcome function               */
/**********************************/
function showWelcomeMsg() {
    var mqttPart1 = chalk.blue('      __  ___ ____  ______ ______        ____ __ __ ____ ___   __ __ ____ ___   ___ '),
        mqttPart2 = chalk.blue('     /  |/  // __ \\/_  __//_  __/ ____  / __// // // __// _ \\ / // // __// _ \\ / _ \\'),
        mqttPart3 = chalk.blue('    / /|_/ // /_/ / / /    / /   /___/ _\\ \\ / _  // _/ / ___// _  // _/ / , _// // /'),
        mqttPart4 = chalk.blue('   /_/  /_/ \\___\\_\\/_/    /_/         /___//_//_//___//_/   /_//_//___//_/|_|/____/ ');

    console.log('');
    console.log('');
    console.log('Welcome to mqtt-shepherd webapp... ');
    console.log('');
    console.log(mqttPart1);
    console.log(mqttPart2);
    console.log(mqttPart3);
    console.log(mqttPart4);
    console.log(chalk.gray('         A Lightweight MQTT Machine Network Server'));
    console.log('');
    console.log('   >>> Author:     Simen Li (simenkid@gmail.com)');
    console.log('   >>> Version:    mqtt-shepherd v0.2.8');
    console.log('   >>> Document:   https://github.com/lwmqn/mqtt-shepherd');
    console.log('   >>> Copyright (c) 2016 Simen Li, The MIT License (MIT)');
    console.log('');
    console.log('The server is up and running, press Ctrl+C to stop server.');
    console.log('');
    console.log('---------------------------------------------------------------');
}

/**********************************/
/* goodBye function               */
/**********************************/
function setLeaveMsg() {
    process.stdin.resume();

    function showLeaveMessage() {
        console.log(' ');
        console.log(chalk.blue('      _____              __      __                  '));
        console.log(chalk.blue('     / ___/ __  ___  ___/ /____ / /  __ __ ___       '));
        console.log(chalk.blue('    / (_ // _ \\/ _ \\/ _  //___// _ \\/ // // -_)   '));
        console.log(chalk.blue('    \\___/ \\___/\\___/\\_,_/     /_.__/\\_, / \\__/ '));
        console.log(chalk.blue('                                   /___/             '));
        console.log(' ');
        console.log('    >>> This is a simple demonstration of how the shepherd works.');
        console.log('    >>> Please visit the link to know more about this project:   ');
        console.log('    >>>   ' + chalk.yellow('https://github.com/lwmqn/mqtt-shepherd'));
        console.log(' ');
        process.exit();
    }

    process.on('SIGINT', showLeaveMessage);
}

/**********************************/
/* Indication funciton            */
/**********************************/
function readyInd () {
    ioServer.sendInd('ready', {});
    console.log(chalk.green('[         ready ] '));
}

function permitJoiningInd (timeLeft) {
    ioServer.sendInd('permitJoining', { timeLeft: timeLeft });
    console.log(chalk.green('[ permitJoining ] ') + timeLeft + ' sec');
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

    console.log(chalk.magenta('[     devStatus ] ') + '@' + permAddr + ', ' + status);
}

function attrsChangeInd (permAddr, gad) {
    ioServer.sendInd('attrsChange', { permAddr: permAddr, gad: gad });
    console.log(chalk.blue('[   attrsChange ] ') + '@' + permAddr + ', auxId: ' + gad.auxId + ', value: ' + gad.value);
}

function toastInd (msg) {
    ioServer.sendInd('toast', { msg: msg });
}

function getGadType(name, appType) {
    if (name === 'dOut' && appType === 'flame')
        return 'Flame';
    else if (name == 'onOffSwitch')
        return 'Switch';
    else if (name === 'lightCtrl')
        return 'Light';
    else if (name === 'presence')
        return 'Pir';
    else
        return _.upperFirst(name);
}

function getGadValue(qnode, name, iid) {
    var val;

    if (name === 'temperature' || name === 'humidity' || name === 'illuminance')
        val = qnode.so.get(name, iid, 'sensorValue');
    else if (name === 'buzzer' || name === 'lightCtrl')
        val = qnode.so.get(name, iid, 'onOff');
    else if (name === 'onOffSwitch' || name === 'presence')
        val = qnode.so.get(name, iid, 'dInState');
    else if (name === 'dOut')
        val = qnode.so.get(name, iid, 'dOutState');

    return val;
}

function mainResourceName(name) {
    if (name === 'temperature' || name === 'humidity' || name === 'illuminance')
        return 'sensorValue';
    else if (name === 'buzzer' || name === 'lightCtrl')
        return 'onOff';
    else if (name === 'onOffSwitch' || name === 'presence')
        return 'dInState';
    else if (name === 'dOut')
        return 'dOutState';
}


function startPolling(qnode) {
    isPolling = true;
        setInterval(function () {
            qnode.readReq('temperature/0/sensorValue', function (err, rsp) {
                // console.log('########################1');
                // console.log(rsp);
            });
        }, 3000);
        setInterval(function () {
            qnode.readReq('humidity/0/sensorValue', function (err, rsp) {
                // console.log('########################2');
                // console.log(rsp);
            });
        }, 3000);
        setInterval(function () {
            qnode.readReq('illuminance/1/sensorValue', function (err, rsp) {
                // console.log('########################3');
                // console.log(rsp);
            });
        }, 3000);
}

module.exports = app;
