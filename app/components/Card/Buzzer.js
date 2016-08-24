import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import {write} from '../../redux/cardBlock';

var BuzzerCard = React.createClass({
	propTypes: {
        write: PropTypes.func.isRequired
    },
	handleClick: function () {
        this.props.write('AA:BB:CC', 'buzzer/0/onoff', 1);
    },
    render: function () {
        return (
            <div style={{width: '100%', height: '100%', backgroundColor: '#89C4F4'}}>
            	<button onClick={this.handleClick}>write</button>
                BuzzerCard
            </div>
        );
    }
});

function select(state) {
    return { 
        devs: state.cardBlock.devs 
    };
}

export default connect(
    select, 
    {write}
)(BuzzerCard)
