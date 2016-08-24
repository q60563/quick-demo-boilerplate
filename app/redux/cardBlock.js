import ioClient from '../helpers/ioClient';

// Actions
const GETDEVS = 'app/cardBlock/GETDEVS';
const WRITE = 'app/cardBlock/WRITE';
const UPDATEDEVS = 'app/cardBlock/UPDATEDEVS';

const initialState = {
        devs: {} 
    };

// Reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GETDEVS:
            return {
                ...state,
                devs: action.data
            };

        case WRITE:
            return state;

        case UPDATEDEVS:
            return {
                ...state,
                devs: action.data
            };

        default:
            return state;
    }
}

// Action Creators
export function getDevs() {
    return { type: GETDEVS };
}

export function write(permAddr, auxId, value) {
    return { type: WRITE, permAddr: permAddr, auxId: auxId, value: value };
}

export function updateDevs(devs) {
    return { type: UPDATEDEVS, devs: devs };
}

