import { createStore , combineReducers} from "redux";
import Registerreducer from "./register/reducer";
import Mapreducer from "./map/reducer" 

export const rootReducer= combineReducers({
    register:Registerreducer,
    map:Mapreducer
  })

const store = createStore(rootReducer);

export default store;