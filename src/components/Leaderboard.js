import React from 'react';
import PollTemplate from './widgets/PollTemplates'; 

const Leaderboard = (props) => {
    console.log('leader', props);
    const {users} = props;

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

   //pass as props userScores
    return (
        userScores.map((userscore,i) => <PollTemplate key={userscore.userId} {...props} classIndex={i} userscore={userscore} type="leaderboard"/>)
    );
};

export default Leaderboard;