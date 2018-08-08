import React, { Component } from 'react';

class UserLoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          value: '',
          disabled:true
        }
      }
      handleChange = (event) => {
        this.setState({value: event.target.value});
      }
    
      handleSubmit = (event) => {
        event.preventDefault();
        this.props.setAuthUser(this.state.value);
        this.props.login();
        //provide dispatch logic to add the value to authuser in the redux store
       // this.setState({value: ''});
      }


    render() {
      //get user names to generate our form options to choose a user to login with
      const usernames = Object.keys(this.props.users).map(user => <option key={user} value={user}>{user}</option>);
        return (
                  <form onSubmit={this.handleSubmit}>
                    <label>
                      Choose User to login with:
                      <select onChange={this.handleChange} required>
                      <option value="">-</option>
                        {usernames}
                      </select>
                    </label>
                    <input type="submit" value="Submit" />
                  </form>
                );
    }
}

export default UserLoginForm;