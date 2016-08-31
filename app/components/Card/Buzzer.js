import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import {write} from '../../redux/modules/cardBlock';

var BuzzerCard = React.createClass({
    propTypes: {
        write: PropTypes.func.isRequired
    },
    handleClick: function () {
        
    },
    render: function () {
        return (
            <div style={{width: '100%', height: '100%', backgroundColor: '#89C4F4'}}>
                BuzzerCard
            </div>
        );
    }
});

function mapStateToProps (state) {
    return { 
        devs: state.cardBlock.devs
    };
}

export default connect(
    mapStateToProps, 
    {write}
)(BuzzerCard)
