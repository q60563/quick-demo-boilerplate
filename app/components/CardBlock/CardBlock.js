import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import GridLayout from 'react-grid-layout';
import {WidthProvider} from 'react-grid-layout';

import {getDevs, write} from '../../redux/modules/cardBlock';

import {Light, Buzzer, Flame, Pir, Switch, Temperature, 
        Humidity, Illuminance , Weather} from '../Card/Card';

var ReactGridLayout = WidthProvider(GridLayout);

var keyCounter,
    layoutDataGrids;

var CardBlock = React.createClass({
    propTypes: {
        getDevs: PropTypes.func.isRequired
    },
    
    componentDidMount: function () {
        this.props.getDevs();
    },

    getKeyAndDataGrid: function (type) {
        var cardProps = {
            key: null,
            dataGrid: null
        };

        switch (type) {
            case 'Light':
            case 'Buzzer':
            case 'Flame':
            case 'Pir':
            case 'Switch':
                cardProps.key = 'smallCard' + keyCounter.small;
                keyCounter.small += 1;

                if (layoutDataGrids.smallCard.length > 0) 
                    cardProps.dataGrid = layoutDataGrids.smallCard.splice(-(layoutDataGrids.smallCard.length), 1)[0];
                else 
                    cardProps.dataGrid = {x: 4, y: 4, w: 1, h: 2};
                break;

            case 'Temperature':
            case 'Humidity':
            case 'Illuminance':
                cardProps.key = 'bigCard' + keyCounter.big;
                keyCounter.big += 1;

                if (layoutDataGrids.bigCard.length > 0) 
                    cardProps.dataGrid = layoutDataGrids.bigCard.splice(-(layoutDataGrids.bigCard.length), 1)[0];
                else 
                    cardProps.dataGrid = {x: 4, y: 4, w: 2, h: 2};
                break;

            default:
                break;
        }

        return cardProps;
    },

    getCard: function (type) {
        var card,
            cardProps = this.getKeyAndDataGrid(type);

        // <Light enable={true/false} onOff={true/false} onClick={optional} />
        // <Buzzer enable={true/false} onOff={true/false} onClick={optional} />
        // <Flame enable={true/false} triggered={true/false} onClick={optional} />
        // <Pir enable={true/false} triggered={true/false} onClick={optional} />
        // <Switch enable={true/false} onOff={true/false} onClick={optional} />

        switch (type) {
            case 'Light':
                card = (<Light enable={true} onOff={true} />);
                break;
            case 'Buzzer':
                card = (<Buzzer enable={true} onOff={true} />);
                break;
            case 'Flame':
                card = (<Flame enable={true} triggered={true} />);
                break;
            case 'Pir':
                card = (<Pir enable={true} triggered={true} />);
                break;
            case 'Switch':
                card = (<Switch enable={true} onOff={true}/>);
                break;
            case 'Temperature':
                card = (<Temperature />);
                break;
            case 'Humidity':
                card = (<Humidity />);
                break;
            case 'Illuminance':
                card = (<Illuminance />);
                break;
            default:
                break;
        }

        return (
            <div key={cardProps.key} data-grid={cardProps.dataGrid}>
                {card}
            </div>
        );
    },

    render: function () {
        var allGadRender = [];

        keyCounter = {
            small: 0,
            big: 0
        };

        layoutDataGrids = {
            smallCard: [
                {x: 5, y: 2, w: 1, h: 2},
                {x: 6, y: 2, w: 1, h: 2},
                {x: 5, y: 1, w: 1, h: 2},
                {x: 4, y: 3, w: 1, h: 2},
                {x: 6, y: 3, w: 1, h: 2}
            ],
            bigCard: [
                {x: 4, y: 0, w: 2, h: 2},
                {x: 3, y: 1, w: 2, h: 2},
                {x: 3, y: 2, w: 2, h: 2}
            ]
        };

        for (var permAddr in this.props.devs) {
            for (var auxId in this.props.devs[permAddr].gads) {
                var type = this.props.devs[permAddr].gads[auxId].type,
                    card = this.getCard(type);
                allGadRender.push(card);
            }
        }

        allGadRender.push(
            <div key='Weather' data-grid={{x: 6, y: 0, w: 2, h: 4}}>
                <Weather />
            </div>
        );

        return (
            <div>
                <ReactGridLayout rowHeight={60} isDraggable={false}>
                    {allGadRender}
                </ReactGridLayout>
            </div>
        );
    }
});
                    
function mapStateToProps (state) {
    return { 
        devs: state.cardBlock.devs 
    };
}

export default connect(
    mapStateToProps, 
    {getDevs}
)(CardBlock)
