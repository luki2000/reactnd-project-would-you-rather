import React, { Component } from 'react';
import {Route, BrowserRouter as Router, Link, Redirect, withRouter, Switch } from 'react-router-dom'; 
import { connect } from 'react-redux';
import { signOffAuthUser } from './actions/authentication';
import { handleInitialQuestionData, SaveTheQuestion } from './actions/questions';



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
    ? <p>Welcome {users[authUser].name} <button onClick={()=>{
        signOff(() =>history.push('/'));
    }}>Sign Out</button> </p>
    : <p>You are not logged in</p> 
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
                    <AuthButton signOff={this.props.signOffAuthUser} users={this.props.users} authUser={this.props.authUser} authenticator={this.props.isAuthenticated}/>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/newquestion">New Question</Link></li>
                        <li><Link to="/leaderboard">Leaderboard</Link></li>
                    </ul>
                    <Switch>
                        <Route path='/Login' component={Login} />
                        <PrivateRoute authenticator={this.props.isAuthenticated} exact path='/' component={Home}/>
                        <PrivateRoute authenticator={this.props.isAuthenticated} path='/newquestion' SaveTheQuestion={this.props.SaveTheQuestion} component={NewQuestion} />
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

export default connect(mapStateToProps, { signOffAuthUser, handleInitialQuestionData, SaveTheQuestion })(App);