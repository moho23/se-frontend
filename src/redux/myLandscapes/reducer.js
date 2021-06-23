import * as Actions from './actions'

const initialState = {
    item: null,
    update: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case(Actions.ITEM):
            return {
                ...state,
                item: action.item
            }
        case(Actions.UPDATE):
            return {
                ...state,
                update: action.bool
            }
        default:
            return state
    }
}

export default reducer
