import React from 'react';
import {checkIfUserAnsweredById} from '../utils/helper';
import PollTemplates from './widgets/PollTemplates'
import {Link} from 'react-router-dom';

const Error = () => (
    <div>
        <h2>404 Not Found</h2>
        <p>Sorry but the question you were looking for doesn't exist. You can view
            questions at the
            <Link to="/">homepage.</Link>
        </p>
    </div>
);
//This component serves to show the user the question to answer once clicked in the homepage or
//the result if he had already answered
class ChooseQuestionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: 'optionOne'
        }
    }

    handleAnswerSubmit = (e) => {
        e.preventDefault();
        const {id} = this.props;
        const obj = {
            answer: this.state.selectedOption,
            qid: id
        }
        this
            .props
            .handleAnswer(obj.answer, obj.qid);
    }

    handleChange = (e) => {
        this.setState({selectedOption: e.target.value});
    }

    render() {
        const {id, questions, authuser} = this.props;
        // Here we pass in the id we mapped over and passed as props. If the an
        // existingid was manually passed in the URL it still works bc we are setting it
        // as property to our questions. If the id is none existing its undefined and we
        // give a default value of false
        const question = questions[id] || false;
        // verify if the question id even exist. if not send user to error page
        // compoenent.
        if (question === false) {
            return <Error/>;
        }
        
        const vote1 = {
            text: question.optionOne.text,
            length: question.optionOne.votes.length
        }
        const vote2 = {
            text: question.optionTwo.text,
            length: question.optionTwo.votes.length
        }
        const answered = checkIfUserAnsweredById(question.id, questions, authuser);
        return (
            <div>
                {answered.length > 0
                    ? <PollTemplates {...this.props} vote1={vote1} vote2={vote2} type="pollResult"/>
                    : <PollTemplates
                        {...this.props}
                        selectedOption={this.state.selectedOption}
                        handleAnswerSubmit={this.handleAnswerSubmit}
                        handleChange={this.handleChange}
                        vote1={vote1}
                        vote2={vote2}
                        type="selectPollAnswer"/>}
            </div>
        );
    }
}

export default ChooseQuestionForm;