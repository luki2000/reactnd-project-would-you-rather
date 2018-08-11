export const SET_AUTH_USER = 'SET_AUTH_USER';
export const SIGN_OFF_AUTH_USER = 'SIGN_OFF_AUTH_USER';
export const IS_AUTHENTICATED = 'IS_AUTHENTICATED';

export function isAuthenticated(bool) {
    return {
        type: IS_AUTHENTICATED,
        bool
    }
}

export function setAuthUser(userId) {
    return (dispatch) => {
        dispatch({
            type: SET_AUTH_USER,
            userId
        });
        dispatch(isAuthenticated(true));
    }
}

export function signOffAuthUser(cb) {
    return (dispatch) => {
        dispatch({
            type: SIGN_OFF_AUTH_USER
        });
        dispatch(isAuthenticated(false));
        cb();
    }
}