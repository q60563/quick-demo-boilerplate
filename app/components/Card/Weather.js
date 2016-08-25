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
        return (
            <div style={{width: '100%', height: '100%', backgroundColor: '#03A9F4'}}>
                WeatherCard
            </div>
        );
    }
});

function mapStateToProps (state) {
    return { 
        weather: state.weather.weather 
    };
}

export default connect(
    mapStateToProps , 
    {getWeather}
)(WeatherCard)
