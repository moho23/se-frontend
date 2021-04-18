import { get, responseValidator } from '../scripts/api';
import { authToken } from '../scripts/storage';
import { setAuth, setUserData } from '../redux/actions';
import { APIPath } from '../data';

export const projectInitialize = (dispatch) => {
    getUser(dispatch);
};

const getUser = (dispatch) => {
    if (!authToken.get()) {
        dispatch(setAuth("inValid"));
    } else {
        get(APIPath.account.profile).then((res) => {
            if (responseValidator(res.status) && res.data) {
                dispatch(setUserData(res.data));
                dispatch(setAuth("valid"));
            } else {
                authToken.remove();
                dispatch(setAuth("inValid"));
            }
        });
    }
};
