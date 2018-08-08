import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
class Question extends Component {
    render() {
        //TODO RENDER TWO LIST OF QUESTIONS based on whether the auth user answered the question or not.
        const { question,/* authUser,*/ users } = this.props;
        
        return (
            <Link to={`/question/${question.id}`}>
                <p>avatar is {users[question.author].avatarURL } and author is 
                {users[question.author].name} and ...{question.optionOne.text}...</p>
            </Link>

        );
    }
}

function mapStateToProps({/*authUser,*/ users,questions}, { id }) {
    const question = questions[id]; 

    return {
       /* authUser,*/
        question,
        users
    }
}

export default connect(mapStateToProps)(Question);