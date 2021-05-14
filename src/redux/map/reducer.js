import * as Actions from './actions'


const inintialState={
    expandedKeys:[],
    checkedKeys:[],
    selectedKeys:[],
    autoExpandParent:true,
    current:"all",
    searchArea:1000,

    searchMarkerArray:null,
    modalDetailsShow:false,
    
}

const reducer=(state=inintialState,action)=>{
    switch(action.type){
        case(Actions.EXPAND):
            return{
                ...state,
                expandedKeys:action.expandedKeysValue,
                autoExpandParent:false
            }   
        case(Actions.CHECK):
            console.log("action",action.checkedKeysValue)
            return{
                ...state,
                checkedKeys:action.checkedKeysValue
            }
        case(Actions.SELECT):
            return{
                ...state,
                selectedKeys:action.selectedKeysValue
            }
        case(Actions.SEARCHAREA):
            return{
                ...state,
                searchArea:action.searchareaValue
            }
        case(Actions.CURRENT):
            return{
                ...state,
                current:action.currentValue
            }
        case(Actions.ONSERACH):
            return{
                ...state,
                searchMarkerArray:action.searchMarker
            }
        case(Actions.MODALDETAILSHOW):
            return{
                ...state,
                modalDetailsShow:!state.modalDetailsShow
            }
    
        default:
            return state

    }



    
}

export default reducer
