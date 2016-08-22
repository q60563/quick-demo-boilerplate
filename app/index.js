import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

var WebApp = React.createClass({
    render: function () {
        return (
            <MuiThemeProvider>
            	Hello world!
            </MuiThemeProvider>
        );
    }
});

ReactDOM.render(<WebApp />, document.getElementById('mybody'));
