import React from 'react';
//This component serves to create new questions
class NewQuestion extends React.Component {
    state = {
        optionOne: '',
        optionTwo: ''
    }
    handleInput = (e) => {
        const name = e.target.name;
        this.setState({[name]: e.target.value});
    }
    sendAnswer = (e) => {
        e.preventDefault();
        const obj = {
            optionOneText: this.state.optionOne,
            optionTwoText: this.state.optionTwo
        }
        this.props.SaveTheNewQuestion(obj, this.props.history);
    }
    render() {
        return (
            <div>
                <h1 style={{
                    textAlign: 'center'
                }}>Create New Question</h1>
                <form className="createPoll card" onSubmit={this.sendAnswer}>
                    <h3>Complete the question:</h3>
                    <p>Would you Rather...</p>
                    <fieldset className="newquestion">
                        <label className="newquestion" htmlFor="option1">Option One:</label>
                        <input
                            className="newquestion"
                            required
                            type="text"
                            id="option1"
                            name="optionOne"
                            onChange={this.handleInput}
                            value={this.state.optionOne}/>
                        - OR -<br/><br/>
                        <label className="newquestion" htmlFor="option2">Option Two:</label>
                        <input
                            className="newquestion"
                            required
                            type="text"
                            id="option2"
                            name="optionTwo"
                            onChange={this.handleInput}
                            value={this.state.optionTwo}/>
                    </fieldset>
                    <button className="action-button button-primary" type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default NewQuestion;