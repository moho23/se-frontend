import * as Actions from './actions'

const initialState = {
    props: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case(Actions.PROPS):
            return {
                ...state,
                props: action.props
            }
        default:
            return state
    }
}

export default reducer