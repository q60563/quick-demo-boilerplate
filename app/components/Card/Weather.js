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
        console.log(this.props.weather);
        return (
            <div style={{width: '100%', height: '100%', backgroundColor: '#03A9F4'}}>
                <div style={{float: 'left', width: '50%', color: 'white', padding: '10% 2.5%'}}>
                    <div style={{fontSize: '20px'}}>{this.props.weather.weather[0].description}</div>
                    <div style={{fontSize: '28px', fontWeight:'bolder', padding: '0% 0% 0% 20%', margin:'20% 0%'}}>{this.props.weather.main.temp} °</div>
                </div>

                <div style={{float: 'left', width: '40%', color: 'white', padding: '10% 2.5%'}}>
                    <div style={{}}></div>
                    <div style={{fontSize: '20px', fontWeight:'bold', margin:'10% 0%'}}>{this.props.weather.main.temp_min} °</div>
                    <div style={{fontSize: '20px', fontWeight:'bold', margin:'10% 0%'}}>{this.props.weather.main.temp_max} °</div>
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
