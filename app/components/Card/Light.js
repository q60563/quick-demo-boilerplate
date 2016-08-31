import React from 'react';
import LightOnIcon from '../Icons/LightOnIcon'
import LightOffIcon from '../Icons/LightOffIcon'

import {connect} from 'react-redux';
import {on, off} from '../../redux/modules/LightCard';

// props: { enable, onOff, onLightClick }

var bgColor = '#F89D24',
    fgColorOn = "#FFF",
    fgColorOff = "#5D4037";

var LightCard = React.createClass({
    getDefaultProps: function () {
        return {
            enable: false,
            onOff: false,
            onLightClick: null  // function (onOff) {}
        }
    },
    handleClick: function () {
        return this.props.onLightClick(!this.props.onOff);
    },
    render: function () {
        var icon = !!this.props.onOff ? <LightOnIcon fill={fgColorOn} /> : <LightOffIcon fill={fgColorOff} />;

        return (
            <div onClick={this.handleClick} style={{width: '100%', height: '100%', backgroundColor: bgColor }}>
                {icon}
            </div>
        );
    }
});

function mapStateToProps (state) {
    return { 
        enable: state.enable,
        onOff: state.onOff,
    };
}

function mapDispatchToProps (dispatch) {
    return {
        onLightClick: function (onOff) {
            var action = !!onOff ? on() : off();
            dispatch(action);
        }
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(LightCard)
