
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
                [action.authUser]: {
                    ...state[action.authUser],
                    questions: state[action.authUser].questions.concat([action.question.id])    
                }
            }
        default:
            return state;
    }
}