import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import GridLayout from 'react-grid-layout';
import {WidthProvider} from 'react-grid-layout';

import {getDevs, updateDevs} from '../../redux/cardBlock';

import {Light, Buzzer, Flame, Pir, Switch, Temperature, 
        Humidity, Illuminance , Weather} from '../Card/Card';

var ReactGridLayout = WidthProvider(GridLayout);

var CardBlock = React.createClass({
    propTypes: {
        getDevs: PropTypes.func.isRequired
    },
    handleClick: function () {
        this.props.getDevs();
    },
    render: function () {
        var layout = [
            {i: 'SmallCard1',  x: 5, y: 2, w: 1, h: 2},
            {i: 'SmallCard2',  x: 6, y: 2, w: 1, h: 2},
            {i: 'SmallCard3',  x: 5, y: 1, w: 1, h: 2},
            {i: 'SmallCard4',  x: 4, y: 3, w: 1, h: 2},
            {i: 'SmallCard5',  x: 6, y: 3, w: 1, h: 2},
            {i: 'BigCard1',    x: 4, y: 0, w: 2, h: 2},
            {i: 'BigCard2',    x: 3, y: 1, w: 2, h: 2},
            {i: 'BigCard3',    x: 3, y: 2, w: 2, h: 2},
            {i: 'WeatherCard', x: 6, y: 0, w: 2, h: 4}
        ];
console.log(this.props.devs);
        return (
            <div>
                <button onClick={this.handleClick}>get</button>
                <ReactGridLayout layout={layout} rowHeight={60} >
                    <div key="SmallCard1">
                        <Light />
                    </div>

                    <div key="SmallCard2">
                        <Buzzer />
                    </div>

                    <div key="SmallCard3">
                        <Flame />
                    </div>

                    <div key="SmallCard4">
                        <Pir />
                    </div>

                    <div key="SmallCard5">
                        <Switch />
                    </div>
                    
                    <div key="BigCard1">
                        <Temperature />
                    </div>

                    <div key="BigCard2">
                        <Humidity />
                    </div>

                    <div key="BigCard3">
                        <Illuminance />
                    </div>

                    <div key="WeatherCard">
                        <Weather />
                    </div>
                </ReactGridLayout>
            </div>
        );
    }
});

function select(state) {
    return { 
        devs: state.cardBlock.devs 
    };
}

export default connect(
    select, 
    {getDevs, updateDevs}
)(CardBlock)
