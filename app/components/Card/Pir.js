import React from 'react';
import PirWatchIcon from '../Icons/PirWatchIcon'
import PirTriggeredIcon from '../Icons/PirTriggeredIcon'

var csshake = require('../../styles/csshake.css');

var bgColor = '#F4D830';

var PirCard = React.createClass({
    getDefaultProps: function () {
        return {
            triggered: false
        }
    },
    render: function () {
        return (
            <div className={csshake['shake-rotate'] + ' ' + csshake['shake-constant'] + ' ' + csshake['shake-constant--hover']} style={{width: '100%', height: '100%', backgroundColor: bgColor}}>
                {this.props.triggered ? <PirTriggeredIcon fill="#FF7C80" /> : <PirWatchIcon fill="#FF7C80" /> }
            </div>
        );
    }
});

module.exports = PirCard;
