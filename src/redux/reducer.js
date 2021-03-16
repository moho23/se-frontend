import {
    USER_DATA,
} from "./actions";

export const initial_state = {
    userData: null,
}

function reducer(state = initial_state, action) {
    switch (action.type) {
        case (USER_DATA):
            return ({ ...state, userData: action.payload });
        default:
            return state;
    }
}

export default reducer;