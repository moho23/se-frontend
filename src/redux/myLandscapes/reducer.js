import * as Actions from './actions'

const initialState = {
    item: null,
    name:null,
    address:null,
    description:null,
    image:null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case(Actions.ITEM):
            return {
                ...state,
                item: action.item
            }
        default:
            return state
    }
}

export default reducer
