import { TOGGLE_SIDEBAR, AllActions } from '../actions';

const initialState = { open: false };

const toggleReducer = (state = initialState, action: AllActions): typeof initialState => {
    switch (action.type) {
        case TOGGLE_SIDEBAR:
            return { ...state, open: !state.open };
        default:
            return state;
    }
}

export default toggleReducer;




