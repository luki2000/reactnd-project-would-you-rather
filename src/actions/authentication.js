export const SET_AUTH_USER = 'SET_AUTH_USER';
export const SIGN_OFF_AUTH_USER = 'SIGN_OFF_AUTH_USER';
export const IS_AUTHENTICATED = 'IS_AUTHENTICATED';

export function isAuthenticated(bool) {
    return {type: IS_AUTHENTICATED, bool}
}
// once we set our authentication user we update the isauthetication to true,
// this will be useful when verifying against private routes
export function setAuthUser(userId) {
    return (dispatch) => {
        dispatch({type: SET_AUTH_USER, userId});
        dispatch(isAuthenticated(true));
    }
}
// here we remove the current user of our authuser slice of our store and ensure
// no one can login to private pages by setting isauthentication to false
export function signOffAuthUser(cb) {
    return (dispatch) => {
        dispatch({type: SIGN_OFF_AUTH_USER});
        dispatch(isAuthenticated(false));
        cb();
    }
}