import React from 'react';
import {Link} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import Icon from '../../images/icons';

//This is a template for all UI's related to polls. If ever wanted to
//to add a new feature that displays poll details or form in a different way
//I'd simply create a switch case for it with a new JSX
const PollTemplates = (props) => {
    let template = null;

    switch (props.type) {
            // Here is something unusual you may see. we are wrapping our cases in curly
            // brackets so that const have their own local scope per cases.
        case "viewPoll":
            {
                const {questions, users, id} = props;
                const question = questions[id];
                template = <div className="card">
                    <p className="author">Asked by {users[question.author].name}</p>
                    <img
                        className="avatar-img"
                        alt={users[question.author].name}
                        src={users[question.author].avatarURL}/>
                    <p>...{question.optionOne.text}...</p>
                    <Link to={`/question/${id}`} className="action-button button-primary">VIEW POLL</Link>
                </div>;
                break;
            }
        case "selectPollAnswer":
            {
                const {
                    questions,
                    users,
                    id,
                    handleAnswerSubmit,
                    handleChange,
                    selectedOption
                } = props;
                const question = questions[id];
                template = <div className="card-1">
                    <p style={{
                        fontWeight: 'bold'
                    }}>Asked {users[question.author].name}</p>
                    <img
                        className="avatar-img"
                        alt={users[question.author].name}
                        src={users[question.author].avatarURL}/>
                    <p
                        style={{
                        fontWeight: 'bold',
                        fontSize: '20px'
                    }}>Would you rather...</p>
                    <form onSubmit={handleAnswerSubmit}>
                        <label className="container">{question.optionOne.text}
                            <input
                                type="radio"
                                value={Object.keys(question)[3]}
                                onChange={handleChange}
                                checked={selectedOption === 'optionOne'}/>
                            <span className="checkmark"></span>
                        </label>
                        <label className="container">{question.optionTwo.text}
                            <input
                                type="radio"
                                value={Object.keys(question)[4]}
                                onChange={handleChange}
                                checked={selectedOption === 'optionTwo'}/>
                            <span className="checkmark"></span>
                        </label>
                        <button className="action-button button-primary">SUBMIT</button>
                    </form>
                </div>;
                break;
            }
        case "pollResult":
            {
                const {
                    questions,
                    users,
                    authuser,
                    id,
                    vote1,
                    vote2
                } = props;
                const question = questions[id];
                const total = vote2.length + vote1.length;
                const chosenOption = users[authuser].answers[id];
                template = <div
                    className="card-2"
                    style={{
                    display: 'flex',
                    padding: "3rem 1vw"
                }}>
                    <div
                        style={{
                        borderRight: '1px dotted #2196F3',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <p
                            style={{
                            fontWeight: 'bold',
                            color: '#2196F3'
                        }}>Asked by {users[question.author].name}</p>
                        <img
                            className="avatar-img"
                            alt={users[question.author].name}
                            src={users[question.author].avatarURL}/>
                    </div>
                    <div style={{
                        width: '100%'
                    }}>
                        <div className="vote-container">
                            {chosenOption === 'optionOne'
                                ? <img src={Icon.mushroom} className="voted" alt="voted me"/>
                                : null}
                            <p>Would you rather {vote1.text}?</p>
                            <div className="vote-bar__background">
                                <div
                                    className="vote-bar__fill"
                                    style={{
                                    width: vote1.length / total * 100 + '%'
                                }}></div>
                                <div className="vote-bar__percent__number">{Math.floor(vote1.length / total * 100)}%</div>
                            </div>
                            <p
                                style={{
                                textAlign: 'center'
                            }}>{vote1.length}
                                out of {total}</p>
                        </div>
                        <div className="vote-container">
                            {chosenOption === 'optionTwo'
                                ? <img src={Icon.mushroom} className="voted" alt="voted me"/>
                                : null}
                            <p>Would you rather {vote2.text}?</p>
                            <div className="vote-bar__background">
                                <div
                                    className="vote-bar__fill"
                                    style={{
                                    width: vote2.length / total * 100 + '%'
                                }}></div>
                                <div className="vote-bar__percent__number">{Math.floor(vote2.length / total * 100)}%</div>
                            </div>
                            <p
                                style={{
                                textAlign: 'center'
                            }}>{vote2.length}
                                out of {total}</p>
                        </div>
                    </div>
                </div>;
                break;
            }
        case "leaderboard":
            {
                const {userscore, classIndex, users} = props;
                template = <div className="card-3">
                    <div style={{
                        display: 'flex'
                    }}>
                        <div className="avatar-container-lb">
                            <FontAwesome className={`trophy-${classIndex}`} name="trophy"/>
                            <p
                                style={{
                                fontWeight: 'bold',
                                color: '#2196F3'
                            }}>{users[userscore.userId].name}</p>
                            <img
                                className="avatar-img"
                                alt={users[userscore.userId].name}
                                src={users[userscore.userId].avatarURL}/>
                        </div>
                        <div className="question-count-container-lb">
                            <table
                                style={{
                                position: 'relative',
                                top: '55px'
                            }}>
                                <tr>
                                    <td>Total questions created</td>
                                    <td>
                                        <span className="point">{userscore.questions}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Total answers</td>
                                    <td>
                                        <span className="point">{userscore.questionsAnswered}</span>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div
                            style={{
                            width: '27%',
                            padding: '5px'
                        }}>
                            <p>SCORE</p>
                            <span className="total-score">{userscore.questionsAnswered + userscore.questions}</span>
                        </div>
                    </div>
                </div>;
                break;
            }
        default:
            return template;
    }
    return template;
};

export default PollTemplates;