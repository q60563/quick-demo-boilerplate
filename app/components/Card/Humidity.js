import React from 'react';
import HumidityIcon from '../../static/humid.png';

var bgColor = "#00A8E8",
    bgColorDisabled = "#BDBDBD";

const Humidity = ({enable, humid}) => {
    enable = !!enable;

    let cardBgColor = enable ? bgColor : bgColorDisabled;
    let cardValue = enable ? humid : undefined;

    return (
        <div style={{width: "100%", height: "100%", backgroundColor: cardBgColor }}>
            <div style={{float: "left", width: "50%", height: "100%"}}>
                <div style={{position: "relative", top: "50%", left: "25%" , transform: "translateY(-50%)"}}>
                    <img src={HumidityIcon} style={{width: "50%", height: "50%"}} />
                </div>
            </div>

            <div style={{float: "left", width: "50%", height: "100%"}}>
                <div style={{position: "absolute", top: "30%", bottom: "0", left: "50%", right: "0", margin: "0", textAlign: "center", fontSize: "1.5em", color: "white"}}>
                    {cardValue} %
                </div>
            </div>
        </div>
    );
}

export default Humidity
