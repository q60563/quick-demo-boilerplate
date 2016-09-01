import React from 'react';
import LightOnIcon from '../Icons/LightOnIcon'
import LightOffIcon from '../Icons/LightOffIcon'

var fgColor = "#FFF",
    bgColor = '#F89D24',
    fgColorDisabled = "#EEEEEE",
    bgColorDisabled = "#BDBDBD",
    fgColorOn = "#FFF",
    fgColorOff = "#FFF";

const Light = ({ enable, onOff, onClick }) => {
    enable = !!enable;
    onOff = !!onOff;
    onClick = onClick || function () {
        console.log('Light clicked');
    };

    let cardBgColor = enable ? bgColor : bgColorDisabled;
    let cardFgColor = enable ? (onOff ? fgColorOn : fgColorOff) : fgColorDisabled;

    let reallyOn = enable && onOff;
    let icon = reallyOn ? <LightOnIcon fill={cardFgColor} /> : <LightOffIcon fill={cardFgColor} />;

    return (
        <div style={{width: '100%', height: '100%', backgroundColor: cardBgColor }} onClick={onClick}>
            {icon}
        </div>
    );
}

// Light.propTypes = {
//     enable: PropTypes.bool.isRequired,
//     onOff: PropTypes.bool.isRequired,
//     onClick: PropTypes.func.isRequired
// };

export default Light
