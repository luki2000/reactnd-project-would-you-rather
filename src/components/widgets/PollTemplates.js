import React from 'react';
import { Link } from 'react-router-dom';

const PollTemplates = (props) => {
    console.log(props);
    let template = null;

    switch(props.type) {
        case "viewpoll":
            const { questions, users, id} = props; 
            const question = questions[id];
            template =
                <div className="card">
                    <p className="author">Asked by {users[question.author].name}</p>
                    <img className="avatar-img" src={users[question.author].avatarURL} />
                    <p>...{question.optionOne.text}...</p>
                    <Link to={`/question/${id}`} className="action-button">VIEW POLL</Link>
                </div>
            break;
        default:
            template: null;
        }
    return template;
};

export default PollTemplates;