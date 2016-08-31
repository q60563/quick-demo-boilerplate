import React, {PropTypes} from 'react';
import BuzzerOnIcon from '../Icons/BuzzerOnIcon'
import BuzzerOffIcon from '../Icons/BuzzerOffIcon'

import {connect} from 'react-redux';
import {write} from '../../redux/modules/cardBlock';

var BuzzerCard = React.createClass({
    propTypes: {
        write: PropTypes.func.isRequired
    },
    getDefaultProps: function () {
        return {
            onOff: false
        }
    },
    handleClick: function () {
        
    },
    render: function () {
        return (
            <div style={{width: '100%', height: '100%', backgroundColor: '#FFD382'}}>
                {this.props.onOff ? <BuzzerOnIcon fill="#FF7C80" /> : <BuzzerOffIcon fill="#FF7C80" /> }
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
    mapStateToProps , 
    {write}
)(BuzzerCard)
