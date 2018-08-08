
import { GET_USERS } from '../actions/users';
import { ANSWER_QUESTION_TO_USERS, SAVE_QUESTION_TO_USERS } from '../actions/questions';

export function users(state= {}, action) {
    switch(action.type) {
        case GET_USERS:
            return {
                ...state,
                ...action.users
            }
        case ANSWER_QUESTION_TO_USERS:
            return {
                ...state,
                ...action.users
            }
        case SAVE_QUESTION_TO_USERS: 
            return {
                ...state,
                ...action.users
                }
        default:
            return state;
    }
}