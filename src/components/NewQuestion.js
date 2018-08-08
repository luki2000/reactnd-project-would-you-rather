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
        this.props.SaveTheQuestion(obj);
        this.props.history.push('/');
    }
    render() {
        console.log(this.props);
        return (
            <div>
                <form onSubmit={this.sendAnswer}>
                    <input type="text" name="optionOne" onChange={this.handleInput} value={this.state.optionOne}/>
                    <input type="text"  name="optionTwo" onChange={this.handleInput} value={this.state.optionTwo}/>
                    <button type="submit">Create poll</button>
                </form>
            </div>
        );
    }
}

export default NewQuestion;