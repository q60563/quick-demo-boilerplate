import ioClient from '../helpers/ioClient';

// Actions
const GETDEVS = 'app/cardBlock/GETDEVS';
const UPDATEDEVS = 'app/cardBlock/UPDATEDEVS';

const initialState = {
        devs: {} 
    };

// Reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GETDEVS:
            ioClient.sendReq('getDevs', {}, function (status, data) {
                if (status === 1)
                    updateDevs(data);
            });
            return state;

        case UPDATEDEVS:
            return {
                ...state,
                devs: action.devs
            };

        default:
            return state;
    }
}

// Action Creators
export function getDevs() {
    return { type: GETDEVS };
}

export function updateDevs(devs) {
console.log('updateDevs');
    return { type: UPDATEDEVS, devs: devs };
}

