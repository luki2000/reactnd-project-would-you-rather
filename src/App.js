import React, { Component } from 'react';
import {Route, BrowserRouter as Router, Link, Redirect, withRouter, Switch } from 'react-router-dom'; 
import { connect } from 'react-redux';
import { signOffAuthUser } from './actions/authentication';
import { handleInitialQuestionData, SaveTheNewQuestion } from './actions/questions';

import './style.css'


//PAGE COMPONENTS
import NewQuestion from './components/NewQuestion';
import Leaderboard from './components/Leaderboard';
import QuestionPage from './components/QuestionPage';
import Home from './components'; 

//CREDENTIAL COMPONENT
import Login from './components/Login';

// custom component to set private pages
const PrivateRoute = ({component: Component, authenticator,  ...rest}) => (
    //below props are properties passed down by the react-router
    <Route {...rest} render={(props) => {
        //N.B:additionally we need to pass rest below to the component to take in custom props e.g questionId
        //If user is authenticated we render the private component
       return authenticator === true ? <Component {...props} {...rest} /> : <Redirect to={{
            pathname:'/login',
            //here rather than only send a user to login page
            //we set it up so that the logged in user will end up in the intended page
            //rather than only being sent to the home page
            state: { from: props.location}
        }} />
    }}/>
);
//Here we need to wrap AuthButton with withRouter to get a history prop because it is not being 
//rendered by react router, now when signing off we are sent to login
const AuthButton = withRouter(({ history, signOff, authenticator,users,authUser }) => (
    authenticator === true 
? <div style={{marginRight:'40px', display: 'flex',minWidth: '260px',justifyContent: 'space-between',
alignItems: 'center'}} >{users[authUser].name} {<div style={{marginLeft:'10px'}} className="login-img"><img className="avatar" style={{width:'100%'}} src={users[authUser].avatarURL}/></div>} <button style={{marginLeft:'10px'}} className="action-button button-secondary" onClick={()=>{
        signOff(() =>history.push('/'));
    }}>Sign Out</button> </div>
    : <p style={{marginRight:'40px'}} >You are not logged in</p> 
));


const NoMatch = ({ location }) => (
    <div>
      <h3>No match for <code>{location.pathname}</code></h3>
    </div>
  );

class App extends Component {

    componentDidMount() {
        this.props.handleInitialQuestionData();
    }
    render() {
        return (
            <Router>
                <div>
                    <div className="navBar">
                        <ul className="menu">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/newquestion">New Question</Link></li>
                            <li><Link to="/leaderboard">Leaderboard</Link></li>
                        </ul>
                        <AuthButton signOff={this.props.signOffAuthUser} users={this.props.users} authUser={this.props.authUser} authenticator={this.props.isAuthenticated}/>
                    </div>
                    <Switch>
                        <Route path='/Login' component={Login} />
                        <PrivateRoute authenticator={this.props.isAuthenticated} exact path='/' component={Home}/>
                        <PrivateRoute authenticator={this.props.isAuthenticated} path='/newquestion' SaveTheNewQuestion={this.props.SaveTheNewQuestion} component={NewQuestion} />
                        <PrivateRoute authenticator={this.props.isAuthenticated} users={this.props.users} path='/leaderboard' component={Leaderboard}/>
                        <PrivateRoute authenticator={this.props.isAuthenticated} path='/question/:id' component={QuestionPage}/>
                        <Route component={NoMatch} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = ({ isAuthenticated, users, authUser }) => {
    return {
      authUser,
      isAuthenticated,
      users,
    }
}

export default connect(mapStateToProps, { signOffAuthUser, handleInitialQuestionData, SaveTheNewQuestion })(App);