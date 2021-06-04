import { createStore , combineReducers} from "redux";
import Registerreducer from "./register/reducer";
import Mapreducer from "./map/reducer" 
import DriverTravelsreducer from "./driverTravels/reducer"

export const rootReducer= combineReducers({
    register:Registerreducer,
    map:Mapreducer,
    driverTravels:DriverTravelsreducer,
  })

const store = createStore(rootReducer);

export default store;