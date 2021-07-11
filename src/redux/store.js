import { createStore , combineReducers} from "redux";
import Registerreducer from "./register/reducer";
import Mapreducer from "./map/reducer" 
import DriverTravelsreducer from "./driverTravels/reducer"
import MyLandscapesreducer from "./myLandscapes/reducer";
import ModalDetails from "./modalDetails/reducer"

export const rootReducer= combineReducers({
    register:Registerreducer,
    map:Mapreducer,
    driverTravels:DriverTravelsreducer,
    myLandscapes:MyLandscapesreducer,
    modalDetails:ModalDetails,
  })

const store = createStore(rootReducer);

export default store;