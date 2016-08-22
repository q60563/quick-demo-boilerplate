import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import io from './helpers/ioClient';
import NavBar from './components/NavBar/index';
import CardBlock from './components/CardBlock/index';

var App = React.createClass({
    render: function () {
        return (
            <MuiThemeProvider>
                <div>
                    <NavBar />
                    <CardBlock />
                </div>
            </MuiThemeProvider>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('root'));
