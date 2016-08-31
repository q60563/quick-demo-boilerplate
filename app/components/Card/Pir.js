import React from 'react';
import PirWatchIcon from '../Icons/PirWatchIcon'
import PirTriggeredIcon from '../Icons/PirTriggeredIcon'

var animate = require('../../styles/animate.css');
console.log('XXXXXXXXXXXXXXXX');
console.log(animate);
var PirCard = React.createClass({
    getDefaultProps: function () {
        return {
            triggered: false
        }
    },
    render: function () {
        return (
            <div className={animate.animated + ' ' + animate.shake} style={{width: '100%', height: '100%', backgroundColor: '#FFD382'}}>
                {this.props.triggered ? <PirTriggeredIcon fill="#FF7C80" /> : <PirWatchIcon fill="#FF7C80" /> }
                PirCard
            </div>
        );
    }
});

module.exports = PirCard;
