import ioClient from '../../helpers/ioClient';

// Actions
const GETDEVS = 'app/cardBlock/GETDEVS';
const WRITE = 'app/cardBlock/WRITE';
const DEVINCOMING = 'app/cardBlock/DEVINCOMING';
const DEVSTATUS = 'app/cardBlock/DEVSTATUS';
const ATTRSCHANGE = 'app/cardBlock/ATTRSCHANGE';

const initialState = {
        devs: {} 
    };

// Reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GETDEVS:
            return {
                ...state,
                devs: action.devs
            };

        case WRITE:
            return state;

        case DEVINCOMING:
            return state;

        case DEVSTATUS:
            return state;

        case ATTRSCHANGE:
            return state;

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

export function devIncoming(dev) {
    return { type: DEVINCOMING, dev: dev };
}

export function devStatus(permAddr, status) {
    return { type: DEVINCOMING, permAddr: permAddr, status: status };
}

export function attrsChange(gad) {
    return { type: DEVINCOMING, gad: gad };
}

