import React from 'react';

class NewQuestion extends React.Component {
    state = {
        optionOne: '',
        optionTwo: ''
    }
     handleInput = (e) => {
        const name = e.target.name;
        this.setState({[name]:e.target.value});
    }
     sendAnswer = (e) => {
        e.preventDefault();
        //optionOneText, optionTwoText, author
        const obj = {
            optionOneText: this.state.optionOne,
            optionTwoText: this.state.optionTwo,
        }
        this.props.SaveTheNewQuestion(obj,this.props.history);
    }
    render() {
        console.log(this.props);
        return (
            <div>
                <form className="createPoll" onSubmit={this.sendAnswer}>
                    <fieldset className="newquestion">
                        <label className="newquestion" htmlFor="option1">Option One:</label>
                        <input className="newquestion" required type="text" id="option1" name="optionOne" onChange={this.handleInput} value={this.state.optionOne}/>
                        <label className="newquestion" htmlFor="option2">Option Two:</label>
                        <input className="newquestion" required type="text" id="option2" name="optionTwo" onChange={this.handleInput} value={this.state.optionTwo}/>
                    </fieldset>
                    <button className="action-button button-primary" type="submit">Create poll</button>
                </form>
            </div>
        );
    }
}

export default NewQuestion;