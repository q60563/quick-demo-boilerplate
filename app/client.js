import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import ioClient from './helpers/ioClient';

import reducer from './redux/reducer';
import clientMiddleware from './redux/clientMiddleware';
import {permitJoining} from './redux/modules/navBar';
import {devIncoming, devStatus, attrsChange} from './redux/modules/cardBlock';
import {notice, requestClose} from './redux/modules/navBar';

import NavBar from './components/NavBar/NavBar';
import CardBlock from './components/CardBlock/CardBlock';
import NoticeBar from './components/NoticeBar/NoticeBar';

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
            store.dispatch(permitJoining(msg.data.timeLeft));
            break;
        case 'devIncoming':    // msg.data = devInfo
            store.dispatch(devIncoming(msg.data));  
            break;
        case 'devStatus':      // msg.data = { permAddr, status }
            store.dispatch(devStatus(msg.data.permAddr, msg.data.status));
            break;
        case 'attrsChange':    // msg.data = { permAddr, gadInfo } 
            store.dispatch(attrsChange(msg.data.permAddr, msg.data.gad));
            break;
        case 'toast':          // msg.data = { msg }
            store.dispatch(notice(true, msg.data.msg));
            break;
        default:
            break;
    }
});

/*********************************************/
/* App component                             */
/*********************************************/
var App = React.createClass({
    componentDidMount : function () {
        setTimeout(function () {
            console.log('test');
            store.dispatch(devIncoming({
                permAddr: 'AA:BB:CC:DD:EE',
                status: 'online',
                gads: { 
                    'temp/0': {
                        type: 'temp',
                        auxId: 'temp/0',
                        value: '20'
                    }
                }
            }));
        }, 3000);

        setTimeout(function () {
            store.dispatch(devStatus('AA:BB:CC:DD:EE', 'offline'));
        }, 5000);

        setTimeout(function () {
            store.dispatch(attrsChange('AA:BB:CC:DD:EE', {
                type: 'temp',
                auxId: 'temp/0',
                value: '28'
            }));
        }, 7000);
    },
    render: function () {
        return (
            <MuiThemeProvider>
                <div>
                    <NavBar title={this.props.title} />
                    <CardBlock />
                    <NoticeBar />
                </div>     
            </MuiThemeProvider>
        );
    }
});

/*********************************************/
/* render                                    */
/*********************************************/
ReactDOM.render(
    <Provider store={store}>
        <App title={title} />
    </Provider>, 
    document.getElementById('root')
);
