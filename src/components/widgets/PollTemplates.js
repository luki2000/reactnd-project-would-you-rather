import React from 'react';
import { Link } from 'react-router-dom';

const PollTemplates = (props) => {
    let template = null;

    switch(props.type) {
        //Here is something unusual you may see. we are wrapping our cases in curly brackets so that const have their own local scope
        //per case.
        case "viewPoll": {
            const { questions, users, id } = props; 
            const question = questions[id];
            template =
                <div className="card">
                    <p className="author">Asked by {users[question.author].name}</p>
                    <img className="avatar-img" src={users[question.author].avatarURL} />
                    <p>...{question.optionOne.text}...</p>
                    <Link to={`/question/${id}`} className="action-button">VIEW POLL</Link>
                </div>
        }
            break;
        case "selectPollAnswer": {
            const { questions, users, id, handleAnswerSubmit, handleChange, selectedOption, vote1, vote2 } = props;
            const question = questions[id];
            template =
                <div className="card-1">
                    <p style={{fontWeight:'bold'}}>Asked {users[question.author].name}</p>
                    <img className="avatar-img" src={users[question.author].avatarURL}/>
                    <p style={{fontWeight:'bold', fontSize:20+'px'}}>Would you rather...</p>
                    <form onSubmit={handleAnswerSubmit}>
                        <label className="container">{question.optionOne.text}
                                <input type="radio" value={Object.keys(question)[3]}  onChange={handleChange}  checked={selectedOption === 'optionOne'} />
                                <span className="checkmark"></span>
                        </label>
                        <label class="container">{question.optionTwo.text}
                                <input type="radio" value={Object.keys(question)[4]}  onChange={handleChange}  checked={selectedOption === 'optionTwo'} />
                                <span className="checkmark"></span>
                        </label>
                        <button className="action-button">SUBMIT</button>
                    </form>
                </div>
        }
            break;
        default:
            template: null;
        }
    return template;
};

export default PollTemplates;