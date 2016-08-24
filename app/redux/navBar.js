import ioClient from '../helpers/ioClient';

// Actions
const PERMITJOIN = 'app/navBar/PERMITJOIN';

const initialState = { timeLeft: {} };

// Reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case PERMITJOIN:
            ioClient.sendReq('permitJoin', { time: action.time }, function (status) {
                var timeLeft = action.time;
                
                return {
                    ...state,
                    timeLeft
                };
            });
        default: 
            return state;
  }
}

// Action Creators
export function permitJoin(time) {
    return { type: PERMITJOIN, time: time };
}
