import { combineReducers } from 'redux';

import navBar from './modules/navBar';
import cardBlock from './modules/cardBlock';
import weather from './modules/weather';

export default combineReducers({
	navBar,
    cardBlock,
    weather
});
