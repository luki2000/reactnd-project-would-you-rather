import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChooseQuestionForm from './ChooseQuestionForm';
import { handleAnswerQuestion } from '../actions/questions';

class QuestionPage extends Component {
  
    render() {
        const { id,authUser, questions, users } = this.props;
        return (
            <div>
                {/*we should be showing the question form or results instead of the Question component*/}
                <ChooseQuestionForm authuser={authUser} users={users} questions={questions} id={id} handleAnswer={this.props.handleAnswerQuestion}/>
            </div>
        );
    }
}

function mapStateToProps({authUser, questions, users },props) {
    console.log(props);
    const { id } = props.match.params;

    return {
        id,
        authUser,
        questions,
        users
    }
}

export default connect(mapStateToProps,{ handleAnswerQuestion })(QuestionPage);