import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';
import { checkIfUserAnsweredById } from '../utils/helper'



class QuestionList extends Component {
    render() {
        console.log(this.props);
        const { questionIds, questions, authUser } = this.props

        //this function filter through all votes and returns the question ids that the auth user responded
        const answered = checkIfUserAnsweredById(questionIds,questions,authUser);
        
        //once we figured out the answered questions we filter that against the question ids to get the unanswered questions 
        const unanswered = questionIds.filter(id => answered.indexOf(id) === -1 );
        return (
            <div>
                <h3>Unanswered</h3>
                <ul>
                    {unanswered.map(q => <li key={q}><Question id={q}/></li>)}
                </ul>
                <h3>answered</h3>
                <ul>
                    {answered.map(q => <li key={q}><Question id={q}/></li>)}
                </ul>
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