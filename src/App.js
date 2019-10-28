import React, { Component } from 'react'
import ListArticles from './Components/ListArticles'
import LoginForm from './Components/LoginForm'
import { signInUser } from './state/actions/reduxTokenAuthConfig'
import { connect } from 'react-redux'
import { Button, Message } from 'semantic-ui-react'

class App extends Component {
  state = {
    renderLoginForm: false,
    email: '',
    password: '',
    message: ''
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
          debugger
          console.log(error)
        })
    debugger
  }

  render() {
    let renderLogin
    let welcomeMessage

    if (this.props.currentUser.isSignedIn) {
      welcomeMessage = <Message> <h3 id="welcome-message">Hello {this.props.currentUser.attributes.email}</h3>
      <p>{this.state.message}</p>
      </Message>
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
        <Button color='blue' id="login-button" onClick={this.renderFormState}>Login</Button>
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