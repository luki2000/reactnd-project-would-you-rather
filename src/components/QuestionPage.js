import React, {Component} from 'react';
import {connect} from 'react-redux';
import ChooseQuestionForm from './ChooseQuestionForm';
import {handleAnswerQuestion} from '../actions/questions';
//This component is a container for allowing us to pass down the necessary data to the
//dumb component that will display the individual question 
//correctly(whether as result or question to answer depending if he user answered
class QuestionPage extends Component {

    render() {
        const {id, authUser, questions, users} = this.props;
        return (
            <div>
                <ChooseQuestionForm
                    authuser={authUser}
                    users={users}
                    questions={questions}
                    id={id}
                    handleAnswer={this.props.handleAnswerQuestion}/>
            </div>
        );
    }
}

function mapStateToProps({
    authUser,
    questions,
    users
}, props) {
    const {id} = props.match.params;

    return {id, authUser, questions, users}
}

export default connect(mapStateToProps, {handleAnswerQuestion})(QuestionPage);