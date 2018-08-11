import React, { Component } from 'react';
import { connect } from 'react-redux';
import PollTemplates from './widgets/PollTemplates';
import { checkIfUserAnsweredById } from '../utils/helper';



class QuestionList extends Component {
    render() {
        const { questionIds, questions, authUser } = this.props

        //this function filter through all votes and returns the question ids that the auth user responded
        const answered = checkIfUserAnsweredById(questionIds,questions,authUser);
        
        //once we figured out the answered questions we filter that against the question ids to get the unanswered questions 
        const unanswered = questionIds.filter(id => answered.indexOf(id) === -1 );
        return (
            <div className="tabs">
                <input type="radio" name="tabs" id="tabone" defaultChecked />
                <label htmlFor="tabone">Unanswered</label>
                <div className="tab">
                <ul>
                    {unanswered.map(qid => (
                        <li key={qid}>
                            <PollTemplates id={qid} {...this.props} type="viewPoll"/>
                        </li>
                    ))}
                </ul>
                </div>
                <input type="radio" name="tabs" id="tabtwo" />
                <label htmlFor="tabtwo">Answered</label>
                <div className="tab">
                <ul>
                    {answered.map(qid => (
                        <li key={qid}>
                            <PollTemplates id={qid} {...this.props} type="viewPoll"/>
                        </li>
                    ))}
                </ul>
                </div>
            </div>

        );
    }
}

function mapStateToProps({authUser,users,questions}) {
    const questionIds = Object.keys(questions)
        .sort((a,b) => questions[b].timestamp - questions[a].timestamp);
    return {
        authUser,
       questions,
       questionIds,
        users
    }
}

export default connect(mapStateToProps)(QuestionList);