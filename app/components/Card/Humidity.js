import React from 'react';
import HumidityIcon from '../../static/humid.png';

var bgColor = "#c2c2d6";

const Humidity = ({humid}) => {
    return (
        <div style={{width: "100%", height: "100%", backgroundColor: bgColor }}>
            <div style={{float: "left", width: "50%", height: "100%"}}>
                <div style={{position: "relative", top: "50%", left: "25%" , transform: "translateY(-50%)"}}>
                    <img src={HumidityIcon} style={{width: "50%", height: "50%"}} />
                </div>
            </div>

            <div style={{float: "left", width: "50%", height: "100%"}}>
                <div style={{position: "absolute", top: "0", bottom: "0", left: "50%", right: "0", margin: "0", textAlign: "center", fontSize: "36px", lineHeight: "130px"}}>
                    60 %
                </div>
            </div>
        </div>
    );
}

export default Humidity
