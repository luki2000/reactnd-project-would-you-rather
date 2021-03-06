import React, {Component} from 'react';
import UserLoginForm from './userloginForm';
import {connect} from 'react-redux';
import {handleInitialUserData} from '../actions/users';
import {setAuthUser} from '../actions/authentication';
import {Redirect} from 'react-router-dom';
import Icons from '../images/icons';

//This component is the login front page, we get the users data so that we can populate our form with the
//user names we can login with
class Login extends Component {
    state = {
        redirectToReferrer: false
    }
    login = () => {
        this.setState({redirectToReferrer: true})

    }

    componentDidMount() {
        this.props.handleInitialUserData();
    }

    render() {
        const {redirectToReferrer} = this.state;
        // here we grab the props for redirecting to the right page OR just home See
        // private router components in the App component
        const {from} = this.props.location.state || {
            from: {
                pathname: '/'
            }
        };
        if (redirectToReferrer === true) {
            return <Redirect to={from}/>;
        }
        return (
            <div>
                <div className="welcome-message">Welcome to the Would You Rather App!<img
                    style={{
                width: '100px'
            }}
                    alt="star"
                    src={Icons.star}/></div>
                <div className="login-interface">
                    <p>You must log in to view any page {/*this page at {from.pathname}*/}</p>
                    <UserLoginForm
                        users={this.props.users}
                        setAuthUser={this.props.setAuthUser}
                        login={this.login}/>
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({users, authUser, isAuthenticated}) => {
    return {users, authUser, isAuthenticated}
}

export default connect(mapStateToProps, {handleInitialUserData, setAuthUser})(Login);