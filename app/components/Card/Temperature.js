import React from 'react';
import TemperatureIcon from '../../static/temp.png';

var bgColor = "#C0392B",
    bgColorDisabled = "#BDBDBD";

const Temperature = ({enable, temp}) => {
    enable = !!enable;

    let cardBgColor = enable ? bgColor : bgColorDisabled;
    let cardValue = enable ? temp : undefined;

    return (
        <div style={{width: "100%", height: "100%", backgroundColor: cardBgColor}}>
            <div style={{float: "left", width: "50%", height: "100%"}}>
                <div style={{position: "relative", top:"50%", left: "25%" , transform: "translateY(-50%)"}}>
                    <img src={TemperatureIcon} style={{width: "50%", height: "50%"}} />
                </div>
            </div>

            <div style={{float: "left", width: "50%", height: "100%"}}>
                <div style={{position: "absolute", top: "0", bottom: "0", left: "50%", right: "0", margin: "0", textAlign: "center", fontSize: "1.5em", lineHeight: "130px", color: "white"}}>
                    {cardValue} °C
                </div>
            </div>
        </div>
    );
}

export default Temperature
