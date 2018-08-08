import React from 'react';

const Leaderboard = (props) => {
    console.log('leader', props);
    /*
    users
    authUser 
    user name users[authUser].name
    user avatar users[authUser].avatarUrl
    number of answer(s) Object.key(users[authUser].answers).length
    number of question(s) users[authUser].questions.length
    */
   
    const {users} = props;
    /*need to loop over the users
    const name = users[authuser].name;
    const avatar = users[authuser].name;
    const numberOfAnswers = Object.key(users[authUser].answers).length;
    const numberOfQuestions = users[authUser].questions.length;*/
    const userScores = Object.keys(users).map(user => {
        const numberOfAnswers = Object.keys(users[user].answers).length;
        const numberOfQuestions = users[user].questions.length;
        return {
            userId: users[user].id,
            questions:numberOfQuestions,
            questionsAnswered: numberOfAnswers,
            score: numberOfAnswers + numberOfQuestions
        }
    }).sort((a,b) => b.score - a.score);
    console.log(userScores);
    /*const score = numberOfAnswer + numberOfQuestions
    1. map over users and return an array of objects with userID and respective score, order the array by scor
        2. create a user component and then map the above array returning the user component with its data
    */
    return (
        <div>
            Leaderboard
        </div>
    );
};

export default Leaderboard;