import React, { Component } from 'react';
import { signInUser } from './state/actions/reduxTokenAuthConfig';
import { connect } from 'react-redux';

class App extends Component {
  state = {
    renderLoginForm: false,
    email: '',
    password: ''
  }

  renderForm = () => {
    this.setState({
      renderLoginForm: !this.state.renderLoginForm
    })
  }

  inputChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLogin = () => {
    const { signInUser } = this.props;
    const { email, password } = this.state;
    signInUser({ email, password })
      .then(
        console.log('wooooow')
      )
      .catch(error => {
        console.log(error)
      })
  }

  render() {

    let loginForm
    let welcomeMessage

    if (this.props.currentUser.isSignedIn) {
      welcomeMessage = <p id="welcome-message">Hello {this.props.currentUser.attributes.email}</p>
    }

    if (this.state.renderLoginForm) {
      loginForm = (
        <div id="login-form">
          <input onChange={this.inputChangeHandler} name="email" id="email-input" placeholder="Email"/>
          <input onChange={this.inputChangeHandler} name="password" id="password-input" type="password" placeholder="Password"/>
          <button onClick={this.handleLogin} id="submit-login-form">Submit</button>
        </div>
      )
    }

    return (
      <div>
        <h1>First scaffold</h1>

        <button onClick={this.renderForm} id="login-button">Login</button>

        {loginForm}
        {welcomeMessage}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.reduxTokenAuth.currentUser
  }
}

const mapDispatchToProps = {
  signInUser
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
