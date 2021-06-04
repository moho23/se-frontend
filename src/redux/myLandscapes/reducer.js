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
        // case(Actions.NAME):
        //     return {
        //         ...state,
        //         name: action.name
        //     }
        // case(Actions.KINDS):
        //     return {
        //         ...state,
        //         kinds: action.kinds
        //     }
        // case(Actions.ADDRESS):
        //     return {
        //         ...state,
        //         address: action.address
        //     }
        // case(Actions.DESCRIPTION):
        //     return {
        //         ...state,
        //         description: action.description
        //     }
        // case(Actions.IMAGE):
        //     return {
        //         ...state,
        //         image: action.image
        //     }
        default:
            return state
    }
}

export default reducer
