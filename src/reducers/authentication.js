import {SET_AUTH_USER, SIGN_OFF_AUTH_USER, IS_AUTHENTICATED} from '../actions/authentication';

export function authUser(state = null, action) {
    switch (action.type) {
        case SET_AUTH_USER:
            console.log(action.userId);
            return action.userId;
        case SIGN_OFF_AUTH_USER:
            return null;
        default:
            return state;
    }
}

export function isAuthenticated(state = false, action) {
    switch (action.type) {
        case IS_AUTHENTICATED:
            return action.bool;
        default:
            return state;
    }
}
