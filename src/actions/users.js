import {_getUsers} from '../utils/_DATA';

export const GET_USERS = 'GET_USERS';

export function getUsers(users) {
    return {type: GET_USERS, users}
}
//simply we have this action dispatcher to get our users
export function handleInitialUserData() {
    return (dispatch) => {
        return _getUsers().then((users) => {
            dispatch(getUsers(users));
        });
    };
}
