import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import {getWeather} from '../../redux/modules/weather';

var WeatherCard = React.createClass({
    propTypes: {
        getWeather: PropTypes.func.isRequired
    },
    componentDidMount: function () {
        this.props.getWeather('25.071988', '121.578406');
    },
    render: function () {
        var weatherIconUrl;

        if (this.props.weather.weather[0].icon) {
            weatherIconUrl = 'http://openweathermap.org/img/w/' + this.props.weather.weather[0].icon + '.png';
        }

        return (
            <div style={{width: '100%', height: '100%', backgroundColor: '#03A9F4'}}>
                <div style={{float: 'left', width: '45%', color: 'white', padding: '15% 0% 15% 10%'}}>
                    <div style={{fontSize: '20px'}}>{this.props.weather.weather[0].description}</div>
                    <div style={{fontSize: '24px', fontWeight:'bolder', margin:'30% 0%'}}>{this.props.weather.main.temp}°</div>
                    <div style={{fontSize: '20px', margin:'30% 0%'}}>{this.props.weather.name}</div>
                </div>

                <div style={{float: 'left', width: '45%', color: 'white', padding: '10% 0%'}}>
                    <div style={{width: '100%', height: '30%', margin:'0% 0% 10% 0%'}}><img src={weatherIconUrl} style={{width: '80%', height: '80%'}} /></div>
                    <div style={{fontSize: '20px', fontWeight:'bold', margin:'10% 0%'}}>{this.props.weather.main.temp_min}°</div>
                    <div style={{fontSize: '20px', fontWeight:'bold', margin:'10% 0%'}}>{this.props.weather.main.temp_max}°</div>
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
