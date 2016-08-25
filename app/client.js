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
import {devIncoming, devStatus, attrsChange} from './redux/modules/cardBlock';
import {permitJoining} from './redux/modules/navBar';
import NavBar from './components/NavBar/NavBar';
import CardBlock from './components/CardBlock/CardBlock';

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
        case 'attrsChange':    // msg.data = gadInfo 
            store.dispatch(attrsChange(msg.data));
            break;
        case 'toast':

            break;
        default:
            break;
    }
});

/*********************************************/
/* App component                             */
/*********************************************/
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

/*********************************************/
/* render                                    */
/*********************************************/
ReactDOM.render(
    <Provider store={store}>
        <App title={title} />
    </Provider>, 
    document.getElementById('root')
);
