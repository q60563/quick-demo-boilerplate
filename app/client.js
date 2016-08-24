import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
// import request from 'superagent';

import reducer from './redux/reducer';
import clientMiddleware from './redux/clientMiddleware';
import ioClient from './helpers/ioClient';
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
    // request.get(url).end(function (err, rsp) {
    //     if (err) {
    //         console.log(err);
    //     }

    //     console.log(rsp);
    // });
}

// getWeather();

/*********************************************/
/* client app                                */
/*********************************************/
var store = createStore(reducer, applyMiddleware(clientMiddleware)),
    title = 'coap-shepherd';

ioClient.start();
ioClient.on('ind', function (msg) {
    switch (msg.type) {
        case 'ready':

            break;
        case 'permitJoining':  // msg.data = { timeLeft }
            render();
            break;
        case 'devIncoming':    // msg.data = devInfo
            render();   
            break;
        case 'devStatus':      // msg.data = { permAddr, status }
            render();
            break;
        case 'attrsChange':    // msg.data = gadInfo 
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
                    <NavBar title={this.props.title} />
                    <CardBlock />
                </div>     
            </MuiThemeProvider>
        );
    }
});

ReactDOM.render(
    <Provider store={store}>
        <App title={title} />
    </Provider>, 
    document.getElementById('root')
);
