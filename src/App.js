import {Provider} from "react-redux";
import store from "./redux/store";
import MainProject from "./MainProject/mainproject.index";
// import "utilities/styles/index.scss"
// import {ToastContainer} from "react-toastify";

function App() {
    return (
        <Provider store={store}>
            <MainProject/>
        </Provider>
    );
}

export default App;
