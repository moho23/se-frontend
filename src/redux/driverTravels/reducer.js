import * as Actions from './actions'

const initialState = {
    item: null,
    driverModalShow: false,
    isupdate:false
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
        case(Actions.ISUPDATE):
            return {
                ...state,
                isupdate: action.isupdate
            }
        default:
            return state
    }
}

export default reducer