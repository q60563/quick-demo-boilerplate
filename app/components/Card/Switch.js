import React from 'react';
import SwitchOnIcon from '../Icons/SwitchOnIcon'
import SwitchOffIcon from '../Icons/SwitchOffIcon'

var bgColor = '#5CB85C',
    fgColorOn = "#FFF",
    fgColorOff = "#FFF";

var SwitchCard = React.createClass({
    getDefaultProps: function () {
        return {
            onOff: true
        }
    },
    render: function () {
        var icon = !!this.props.onOff ? (<SwitchOnIcon fill={fgColorOn} />) : (<SwitchOffIcon fill={fgColorOff} />);
        return (
            <div style={{width: '100%', height: '100%', backgroundColor: bgColor}}>
                {icon}
            </div>
        );
    }
});

module.exports = SwitchCard;
