import * as Actions from './actions'
import {detailsSideBar} from "../../scripts/storage"
import {get} from "../../scripts/api"


const inintialState={
    expandedKeys:[],
    checkedKeys:[],
    selectedKeys:[],
    autoExpandParent:true,
    current:"all",
    searchArea:1000,

    markerArray:null,
    name:null,
    image:null,
    address:null,
    description:null,
    category:null
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
        case(Actions.CLICKONMARKER):
            detailsSideBar.set(true)
            let url = APIPath.map.details + action.xid
            return new Promise((resolve) => {
                get(url).then((data) => {
                    resolve(true);
                    if (responseValidator(data.status) && data.data) {
                        console.log(data)
                        setDetail(data.data)

                        if (data.data){
                            if (data.data.address.city){
                                return {
                                    ...state,
                                    address:data.data.address.city
                                }
                            if(data.data.address.neighbourhood){
                                setAddress(data.data.address.city+","+data.data.address.neighbourhood)
                            }
                            if(data.data.address.road){
                                setAddress(data.data.address.city+","+data.data.address.neighbourhood+","+data.data.address.road)
                            }
                            }
                            if(data.data.wikipedia_extracts){
                            setDescription(data.data.wikipedia_extracts.text)
                            }
                            if(data.data.name){
                            setName(data.data.name)
                            }
                            if(data.data.kinds){
                            setCategory(data.data.kinds)
                            }
                            if(data.data.image){
                            setImage(data.data.image)
                            }
                        }
    
                        
                    }
                    
                })
            })
    
        default:
            return state

    }



    
}

export default reducer
