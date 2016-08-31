import React from 'react';
import FireIcon from '../Icons/FireIcon'

var FlameCard = React.createClass({
    getDefaultProps: function () {
        return {
            triggered: false
        }
    },
    render: function () {
        return (
            <div style={{width: '100%', height: '100%', backgroundColor: '#FFD382'}}>
                <FireIcon fill="#FF7C80" />
                FlameCard
            </div>
        );
    }
});

module.exports = FlameCard;
