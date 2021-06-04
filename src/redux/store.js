import { createStore , combineReducers} from "redux";
import Registerreducer from "./register/reducer";
import Mapreducer from "./map/reducer";
import MyLandscapesreducer from "./myLandscapes/reducer";

const rootReducer= combineReducers({
    register:Registerreducer,
    map:Mapreducer,
    myLandscapes:MyLandscapesreducer
  })

const store = createStore(rootReducer);

export default store;