import {Provider} from "react-redux";
import store from "./redux/store";
import MainProject from "./MainProject/mainproject.index";
import "./utilities/styles/index.scss"
import {ToastContainer} from "react-toastify";

function App() {
    return (
        <Provider store={store}>
            <MainProject/>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={true}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </Provider>
    );
}

export default App;
