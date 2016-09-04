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
            <div style={{width: '100%', height: '100%', backgroundColor: '#99bbff'}}>
                <div style={{float: 'left', width: '45%', color: 'white', padding: '10% 0% 10% 10%'}}>
                    <div style={{fontSize: '1em'}}>{desc}</div>
                    <div style={{fontSize: '1.2em', fontWeight:'bolder', margin:'30% 0% 30% 10%'}}>{temp}°</div>
                    <div style={{fontSize: '1em'}}>{name}</div>
                </div>

                <div style={{float: 'left', width: '45%', padding: '10% 0%'}}>
                    <div style={{width: '100%', height: '30%'}}>{weatherIcon}</div>
                    <div style={{fontSize: '1em', fontWeight:'bold', color: '#C5EFF7', margin:'5% 0% 20% 15%'}}>{tempMin}°</div>
                    <div style={{fontSize: '1em', fontWeight:'bold', color: '#F1A9A0', margin:'10% 0% 20% 15%'}}>{tempMax}°</div>
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
