import React from 'react';
import LightOnIcon from '../Icons/LightOnIcon'

var LightCard = React.createClass({
    getDefaultProps: function () {
        return {
            onOff: false
        }
    },
    render: function () {
        return (
            <div style={{width: '100%', height: '100%', backgroundColor: '#89C4F4' }}>
                <LightOnIcon fill="#F8DE73" />
                LightCard
            </div>
        );
    }
});

module.exports = LightCard;
