import {_getQuestions, _saveQuestionAnswer, _saveQuestion} from '../utils/_DATA';

export const GET_QUESTIONS = 'GET_QUESTIONS';
export const ANSWER_QUESTION_TO_USERS = 'ANSWER_QUESTION_TO_USERS';
export const ANSWER_QUESTION_TO_QUESTIONS = 'ANSWER_QUESTION_TO_QUESTIONS';


export const SAVE_QUESTION_TO_USERS = 'SAVE_QUESTION_TO_USERS';
export const SAVE_QUESTION_TO_QUESTIONS = 'SAVE_QUESTION_TO_QUESTIONS';

function getQuestions(questions) {
    return {type: GET_QUESTIONS, questions}
}

function saveAnswerToUsers(users) {
    return {type: ANSWER_QUESTION_TO_USERS, users}
}

function saveAnswertoQuestions(questions) {
    return {type: ANSWER_QUESTION_TO_QUESTIONS, questions}
}
//here we call the api to save our answer to a poll and dispatching the action respectively to users and questions pieces of our
//store slices
export function handleAnswerQuestion(answer, qid) {

    return (dispatch, getState) => {
        const {authUser} = getState();
        const answerDetails = {
            answer,
            authedUser: authUser,
            qid
        }
        return _saveQuestionAnswer(answerDetails).then(data => {
            dispatch(saveAnswerToUsers(data.users));
            dispatch(saveAnswertoQuestions(data.questions));
        })

    }
}

export function handleInitialQuestionData() {
    return (dispatch) => {
        return _getQuestions().then((questions) => {
            dispatch(getQuestions(questions));
        });
    };
}

function saveQuestionToUsers(question, authUser) {
    return {type: SAVE_QUESTION_TO_USERS, question, authUser}
}

function saveQuestionToQuestions(question) {
    return {type: SAVE_QUESTION_TO_QUESTIONS, question}
}
//here we dispatch to the reducers to save our new question, ensuring the auth user is the author and that he is
//brought back to the homepage once he created the question
export function SaveTheNewQuestion(questionDetails, cb) {
    return (dispatch, getState) => {
        const {authUser} = getState();
        questionDetails.author = authUser;
        return _saveQuestion(questionDetails).then(data => {
            dispatch(saveQuestionToUsers(data, authUser));
            dispatch(saveQuestionToQuestions(data));
        }).then(() => (
        //this call back pushes users to home after question is updated
        cb.push('/')));
    }
}