const USER_DATA = "USER_DATA";
const setUserData = (payload) => {
    return { type: USER_DATA, payload: payload }
};
export {
    USER_DATA,
    setUserData,
};