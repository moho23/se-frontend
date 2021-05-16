const USER_DATA = "USER_DATA";
const setUserData = (payload) => {
    return {type: USER_DATA, payload: payload}
};
export {
    USER_DATA,
    setUserData,
};

const AUTH_STATUS = 'AUTH_STATUS';
const setAuth = (payload) => ({ type: AUTH_STATUS, payload: payload });
export { AUTH_STATUS, setAuth };