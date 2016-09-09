import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import {getWeather} from '../../redux/modules/weather';
import WeatherIcon from '../Icons/WeatherIcon';

const WeatherCard = React.createClass({
    propTypes: {
        getWeather: PropTypes.func.isRequired
    },
    componentDidMount: function () {
        this.props.getWeather('25.071988', '121.578406');
    },
    render: function () {
        let weatherMain;

        if (this.props.weather.weather[0].main === 'Thunderstorm')
            weatherMain = 'Lightning storm';
        else
            weatherMain = this.props.weather.weather[0].main;

        let desc = weatherMain ? weatherMain : undefined;
        let name = this.props.weather.name ? this.props.weather.name : undefined;
        let temp = this.props.weather.main.temp ? this.props.weather.main.temp.toFixed(1) : undefined;
        let weatherIcon = this.props.weather.weather[0].icon ? <WeatherIcon icon={this.props.weather.weather[0].icon} /> : undefined;
        let tempMin = this.props.weather.main.temp_min ? this.props.weather.main.temp_min.toFixed(1) : undefined;
        let tempMax = this.props.weather.main.temp_max ? this.props.weather.main.temp_max.toFixed(1) : undefined;

        return (
            <div style={{width: '100%', height: '100%', backgroundColor: '#8ED4E8'}}>
                <div style={{float: 'left', width: '55%', height: '100%', color: 'white'}}>
                    <div style={{position: 'relative', transform: 'translateY(-50%)', top: '45%', margin: "0% auto", width: '70%'}}>
                        <div style={{fontSize: '1em'}}>{desc}</div>
                        <div style={{margin:'50% 0%'}}>
                            <div style={{float: 'left', width: '70%', fontSize: '1.2em', textAlign: "center", fontWeight:"bold"}}>{temp}</div>
                            <div style={{paddingTop:'8%', fontSize: '0.8em'}}>°C</div>
                        </div>
                        <div style={{fontSize: '1em'}}>{name}</div>
                    </div>
                </div>

                <div style={{float: 'left', width: '45%', height: '100%'}}>
                    <div style={{position: 'relative', transform: 'translateY(-50%)', top: '45%', margin: "0% auto", width: '80%'}}>
                        <div style={{width: '100%', height: '30%'}}>{weatherIcon}</div>
                        <div style={{fontSize: '1em', color: '#35BBFC', margin:'5% 0% 20%', textAlign: "center"}}>{tempMin}°</div>
                        <div style={{fontSize: '1em', color: '#D64541', textAlign: "center"}}>{tempMax}°</div>
                    </div>
                </div>
            </div>
        );
    }
});

function mapStateToProps (state) {
    return { 
        weather: state.weather.info 
    };
}

export default connect(
    mapStateToProps , 
    {getWeather}
)(WeatherCard)
