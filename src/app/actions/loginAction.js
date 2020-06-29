import { LOGIN_REQUEST, LOGGED_FAILED, LOGGED_SUCCESSFULLY, LOGGED_CLEAR } from './actionTypes';
import { put } from 'redux-saga/effects';

export const loginClear = () => {
    return {
        type: LOGGED_CLEAR
    };
};
export const loginRequest = (email, password) => {
    return {
        type: LOGIN_REQUEST,
        email, password
    };
};
export function* login(loggedInUser) {
    let userData = {};
    if (loggedInUser.email.toLowerCase() == "deepak.dhamija@evry.com" && loggedInUser.password == "12345") {
        userData = { userId: 10805, userName: 'deepak dhamija' };
        localStorage.setItem("UserId", userData.userId);
        localStorage.setItem("UserName", userData.userName);
        yield put({ type: LOGGED_SUCCESSFULLY, user: userData });
    }
    else {
        yield put({ type: LOGGED_FAILED, error: "Wrong username or password" });
    }
};
