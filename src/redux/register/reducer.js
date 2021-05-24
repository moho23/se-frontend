import {
    USER_DATA,
    AUTH_STATUS
} from "./actions";

export const initial_state = {
    userData: null,
    authStatus: "pending",
}

function reducer(state = initial_state, action) {
    switch (action.type) {
        case (USER_DATA):
            return ({...state, userData: action.payload});
        case (AUTH_STATUS):
            return ({...state, authStatus: action.payload});
        default:
            return state;
    }
}

export default reducer;