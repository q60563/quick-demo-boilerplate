import ioClient from '../../helpers/ioClient';

// Actions
const ENABLE = 'app/LightCard/ENABLE';
const ON = 'app/LightCard/ON';
const OFF = 'app/LightCard/OFF';

const initialState = {
    enable: false,
    onOff: false
};

// Reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ENABLE:
                return {
                    ...state,
                    enable: true
                };
        case ON:
                return {
                    ...state,
                    onOff: true
                };
        case OFF:
                return {
                    ...state,
                    onOff: false
                };
        default: 
            return state;
  }
}

// Action Creators
export function enable() {
    return { type: ENABLE };
}

export function on() {
    return { type: ON };
}

export function off() {
    return { type: OFF };
}

