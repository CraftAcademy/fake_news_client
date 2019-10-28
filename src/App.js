import React, { Component } from 'react'
import ListArticles from './Components/ListArticles'
import LoginForm from './Components/LoginForm'
import { signInUser } from './state/actions/reduxTokenAuthConfig'
import { connect } from 'react-redux'

class App extends Component {
  state = {
    renderLoginForm: false,
    email: '',
    password: ''
  }

  renderFormState = () => {
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
          console.log('Yaaaaaaay')
        )
        .catch(error => {
          console.log(error)
        })
  }

  render() {
    let renderLogin
    let welcomeMessage

    if (this.props.currentUser.isSignedIn) {
      welcomeMessage = <p id="welcome-message">Hello {this.props.currentUser.attributes.email}</p>
    }

    if (this.state.renderLoginForm === true) {
      renderLogin = (
        <>
          <LoginForm 
            inputChangeHandlerProps={this.inputChangeHandler}
            handleLoginProps={this.handleLogin}
          />
        </>
      )
    } else {
      renderLogin = (
        <button id="login-button" onClick={this.renderFormState}>Login</button>
      )}

    return (
      <>
        {renderLogin}
        {welcomeMessage}

        <ListArticles 
        />
      </>
    )
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
)(App)