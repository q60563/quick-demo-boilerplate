import React from 'react';
import FireIcon from '../Icons/FireIcon'

var csshake = require('../../styles/csshake.css');

var bgColor = '#F89D24',
    fgColorOn = "#FFF",
    fgColorOff = "#5D4037";

var FlameCard = React.createClass({
    getDefaultProps: function () {
        return {
            triggered: false
        }
    },
    render: function () {
        return (
            <div className={csshake['shake-opacity'] + ' ' + csshake['shake-constant'] + ' ' + csshake['shake-constant--hover']} style={{width: '100%', height: '100%', backgroundColor: bgColor}}>
                <FireIcon fill="#FF7C80" />
            </div>
        );
    }
});

module.exports = FlameCard;
