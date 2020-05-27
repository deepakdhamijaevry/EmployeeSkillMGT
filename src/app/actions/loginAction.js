import { LOGGED_FAILED, LOGGED_SUCCESSFULLY, LOGGED_CLEAR } from './actionTypes';
export const loginError = (error) => {
    return {
        type: LOGGED_FAILED,
        error
    }
};
export const loginSuccess = (user) => {
    return {
        type: LOGGED_SUCCESSFULLY,
        user
    };
};
export const loginClear = () => {
    return {
        type: LOGGED_CLEAR
    };
};
export function loginRequest(email, password) {
    let userData = {};
    return (dispatch) => {
        if (email.toLowerCase() == "deepak.dhamija@evry.com" && password == "12345") {
            userData = { userId: 10805, userName: 'deepak dhamija' };
            localStorage.setItem("UserId", userData.userId);
            localStorage.setItem("UserName", userData.userName);
            dispatch(loginSuccess(userData));
        }
        else {
            dispatch(loginError("Wrong username or password"));
        }
    }
};
