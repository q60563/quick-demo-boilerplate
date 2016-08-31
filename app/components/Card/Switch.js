import React from 'react';
import SwitchOnIcon from '../Icons/SwitchOnIcon'
import SwitchOffIcon from '../Icons/SwitchOffIcon'

var SwitchCard = React.createClass({
    getDefaultProps: function () {
        return {
            onOff: false
        }
    },
    render: function () {
        return (
            <div style={{width: '100%', height: '100%', backgroundColor: '#FFD382'}}>
                {this.props.onOff ? <SwitchOnIcon fill="#FF7C80" /> : <SwitchOffIcon fill="#FF7C80" /> }
                SwitchCard
            </div>
        );
    }
});

module.exports = SwitchCard;
