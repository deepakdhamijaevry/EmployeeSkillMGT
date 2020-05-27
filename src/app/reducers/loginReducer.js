import { LOGGED_SUCCESSFULLY, LOGGED_FAILED, LOGGED_CLEAR } from '../actions/actionTypes';
const initialState = { loggedIn: null, user: {} };
export default function login(state = initialState, action) {
    switch (action.type) {
        case LOGGED_SUCCESSFULLY:
            return {
                loggedIn: true,
                user: action.user
            };
        case LOGGED_FAILED:
            return {
                loggedIn: false,
                error: action.error
            };
        case LOGGED_CLEAR:
            return {
                loggedIn: null
            };
        default:
            return state;
    }
}