import { GET_QUESTIONS, ANSWER_QUESTION_TO_QUESTIONS, SAVE_QUESTION_TO_QUESTIONS } from '../actions/questions'

export function questions(state= {}, action) {
    switch(action.type) {
        case GET_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case ANSWER_QUESTION_TO_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case SAVE_QUESTION_TO_QUESTIONS: 
            return {
                ...state,
                [action.question.id] : action.question
                }
        default:
            return state;
    }
} 