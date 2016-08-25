// Actions
const GETWEATHER = 'app/weather/GETWEATHER';

const initialState = {
        weather: {} 
    };

// Reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GETWEATHER:
            return {
                ...state,
                weather: action.weather
            };

        default:
            return state;
    }
}

// Action Creators
export function getWeather(lat, lon) {
    return { type: GETWEATHER, lat: lat, lon: lon};
}
