var util = require('util'),
    EventEmitter = require('events').EventEmitter,
    io = require('socket.io-client'),
    _ = require('busyman');

function IoClient () {
    var transId = 0;

    this._client = null;
    this._connected = false;

    this._nextTransId = function () {
        if (transId > 255)
            transId = 0;
        return transId++;
    };
}

util.inherits(IoClient, EventEmitter);

var ioClient = new IoClient();

IoClient.prototype.isRunning = function () {
    return !_.isNull(this._client);
};

IoClient.prototype.start = function (addr) {
    var self = this,
        startSuccess = true;

    if (this.isRunning())
        return startSuccess;

    if (!_.isString(addr))
        throw new Error('addr must be a string');

    this._client = io(addr);

    this._client.on('connect', function () {
        self._connected = true;
    });

    this._client.on('disconnect', function () {
        self._connected = false;
    });

    this._client.on('error', function (err) {
        self.emit('error', err);
    });

    this._client.on('rsp', function (msg) {
        var evt = msg.cmd + ':' + msg.seq;

        self.emit(evt, msg.status, msg.data);
    });

    this._client.on('ind', function (msg) {
        self.emit(msg.type, msg.data);
    });

    return this;
};

IoClient.prototype.sendReq = function (cmdName, args, callback) {
    var self = this,
        evt,
        reqMsg = {
            seq: this._nextTransId(),
            cmd: cmdName, 
            args: args
        },
        timeoutCntl,
        rspLsn;

    if (!_.isString(cmdName))
        throw new Error('cmdName must be a string');
    else if (!_.isPlainObject(args))
        throw new Error('args must be an object');
    else if (!_.isFunction(callback))
        throw new Error('callback must be a function');

    if (!this.isRunning()) {
        return callback(new Error ('ioClient is not running.'));
    } else if (!this._connected) {
        return callback(new Error ('ioClient connection is closed.'));
    } else {
        evt = cmdName + ':' + reqMsg.seq;
    }

    timeoutCntl = setTimeout(function () {
        self.removeListener(evt, rspLsn);
        callback(new Error('timeout'));
    }, 5000);

    rspLsn = function (status, data) {
        clearTimeout(timeoutCntl);

        if (status === 0)
            callback(null, data);
        else
            callback(new Error('fail'));
    };

    this.once(evt, rspLsn);
    this._client.emit('req', reqMsg);
};

module.exports = ioClient;
