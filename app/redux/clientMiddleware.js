import request from 'superagent';

import ioClient from '../helpers/ioClient';

const GETDEVS = 'app/cardBlock/GETDEVS';
const WRITE = 'app/cardBlock/WRITE';
const PERMITJOIN = 'app/navBar/PERMITJOIN';
const GETWEATHER = 'app/weather/GETWEATHER';

const clientMiddleware = store => next => action => {
    switch (action.type) {
// navBar
        case PERMITJOIN:
            ioClient.sendReq('permitJoin', { time: action.time }, function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    next(action);    
                } 
            });
            break;

// cardBlork
        case GETDEVS:
            ioClient.sendReq('getDevs', {}, function (err, data) {
                if (err) {
                    console.log(err);
                } else {
console.log(data);
                    action.devs = data;
                    next(action);    
                } 
            });
            break;

        case WRITE:
            ioClient.sendReq('write', { permAddr: action.permAddr, auxId: action.auxId, value: action.value }, function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    next(action);    
                } 
            });
            break;

// weather
        case GETWEATHER:
            var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + action.lat + 
                      '&lon=' + action.lon + '&units=metric&appid=ca57f9dc62e223f3f10d001470edd6cc';

            request.get(url).end(function (err, rsp) {
                if (err) {
                    console.log('error');
                } else {
                    action.weather = JSON.parse(rsp.text);
                    next(action);    
                } 
            });
            break;

        default:
            next(action);
            break;
    }
};

export default clientMiddleware;