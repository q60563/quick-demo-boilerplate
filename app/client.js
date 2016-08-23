import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import request from 'request';

import IoClient from './helpers/IoClient';
import NavBar from './components/NavBar/NavBar';
import CardBlock from './components/CardBlock/CardBlock';

/*********************************************/
/* get weather info                          */
/*********************************************/
function getWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(seachWeather);
    } else {
        
    }
}

function seachWeather(position) {
    var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + 
              position.coords.latitude + '&lon=' + position.coords.longitude + 
              '&appid=ca57f9dc62e223f3f10d001470edd6cc';
console.log(url);
    request(url, function (err, rsp, body) {
        if (err) {
            console.log(err);
        }

        console.log(body);
    });
}

getWeather();
/*********************************************/
/* client app                                */
/*********************************************/
var title = 'coap-shepherd',
    timeLeft = 0,
    devs = {},
    ioClient = new IoClient();

ioClient.start();
ioClient.on('ind', function (msg) {
    switch (msg.type) {
        case 'ready':

            break;
        case 'permitJoining':  // msg.data = { timeLeft }
            timeLeft = msg.data.timeLeft;  
            render();
            break;
        case 'devIncoming':    // msg.data = devInfo
            devs[msg.data.permAddr] = msg.data;  
            render();   
            break;
        case 'devStatus':      // msg.data = { permAddr, status }
            devs[msg.data.permAddr].status = msg.data.status;  
            render();
            break;
        case 'attrsChange':    // msg.data = gadInfo
            devs[msg.data.permAddr].gads[msg.data.auxId] = msg.data;   
            render();
            break;
        case 'toast':

            break;
        default:
            break;
    }
});

var App = React.createClass({
    render: function () {
        return (
            <MuiThemeProvider>
                <div>
                    <NavBar title={this.props.title} timeLeft={this.props.timeLeft} ioClient={this.props.ioClient} />
                    <CardBlock devs={this.props.devs} ioClient={this.props.ioClient} />
                </div>
            </MuiThemeProvider>
        );
    }
});

function render() {
    ReactDOM.render(
        <App 
            title={title} 
            timeLeft={timeLeft} 
            devs={devs} 
            ioClient={ioClient} />, 
        document.getElementById('root'));
}

render();
