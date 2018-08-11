import React from 'react';
import PollTemplate from './widgets/PollTemplates';

const Leaderboard = (props) => {
    const {users} = props;
    //we map over users to extract the overall score and save the details of each users to an object
    //so that we can later map over to our polls template. notice we sorted by score as well, highest coming first
    //in order  
    const userScores = Object
        .keys(users)
        .map(user => {
            const numberOfAnswers = Object
                .keys(users[user].answers)
                .length;
            const numberOfQuestions = users[user].questions.length;
            return {
                userId: users[user].id,
                questions: numberOfQuestions,
                questionsAnswered: numberOfAnswers,
                score: numberOfAnswers + numberOfQuestions
            }
        })
        .sort((a, b) => b.score - a.score);

    //pass as props userScores
    return (userScores.map((userscore, i) => <PollTemplate
        key={userscore.userId}
        {...props}
        classIndex={i}
        userscore={userscore}
        type="leaderboard"/>));
};

export default Leaderboard;