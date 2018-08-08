import { _getQuestions, _saveQuestionAnswer, _saveQuestion } from '../utils/_DATA';

export const GET_QUESTIONS = 'GET_QUESTIONS';
export const ANSWER_QUESTION_TO_USERS = 'ANSWER_QUESTION_TO_USERS';
export const ANSWER_QUESTION_TO_QUESTIONS = 'ANSWER_QUESTION_TO_QUESTIONS';


function getQuestions(questions) {
    return {
        type: GET_QUESTIONS,
        questions
    }
}


function saveAnswerToUsers(users) {
    return {
        type: ANSWER_QUESTION_TO_USERS,
        users
    }
}

function saveAnswertoQuestions(questions) {
    return {
        type: ANSWER_QUESTION_TO_QUESTIONS,
        questions
    }
}

//TODO IMPLEMENT ACTION TO SAVE ANSWER TO QUESTION WHEN SUBMITTING FORM

export function handleAnswerQuestion(answer,qid) {

    return (dispatch,getState) => {
        const { authUser } = getState();
        const answerDetails = {
            answer,
            authedUser: authUser,
            qid
        }
        console.log(answerDetails);
        return _saveQuestionAnswer(answerDetails)
                .then( data => {
                    dispatch(saveAnswerToUsers(data.users));
                    dispatch(saveAnswertoQuestions(data.questions));
                })
            
    }
}

export function handleInitialQuestionData() {
    return (dispatch) => {
        return _getQuestions()
                .then((questions) => {
                    dispatch(getQuestions(questions));
                });
    }; 
}

export const SAVE_QUESTION_TO_USERS = 'SAVE_QUESTION_TO_USERS';
export const SAVE_QUESTION_TO_QUESTIONS = 'SAVE_QUESTION_TO_QUESTIONS';

//saveQuestionToUsers
function saveQuestionToUsers(question,authUser) {
    return {
        type: SAVE_QUESTION_TO_USERS,
        question,
        authUser
    }
}
//saveQuestionToQuestions
function saveQuestionToQuestions(question) {
    return {
        type: SAVE_QUESTION_TO_QUESTIONS,
        question
    }
}

export function SaveTheQuestion(questionDetails) {
    return (dispatch,getState) => {
        const { authUser } = getState();
        questionDetails.author = authUser;
        return _saveQuestion(questionDetails)
                .then( data => {
                    dispatch(saveQuestionToUsers(data,authUser));
                    dispatch(saveQuestionToQuestions(data));
                })
    }
}