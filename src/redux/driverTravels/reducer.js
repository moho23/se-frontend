import * as Actions from './actions'

const initialState = {
    item: null,
    driverModalShow: false,
    check:false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case(Actions.ITEM):
            return {
                ...state,
                item: action.item
            }
        case(Actions.DRIVERMODALSHOW):
            return {
                ...state,
                driverModalShow: action.isopen
            }
        case(Actions.CHECK):
            return {
                ...state,
                check: action.checkInput
            }
        default:
            return state
    }
}

export default reducer