import React, { Component } from 'react'
import ListArticles from './Components/ListArticles'
import LoginForm from './Components/LoginForm'
import { signInUser } from './state/actions/reduxTokenAuthConfig'
import { connect } from 'react-redux'
import { Button, Message } from 'semantic-ui-react'
import { submitLoginData } from './Modules/LoginData'

class App extends Component {
  state = {
    renderLoginForm: false,
    email: '',
    password: '',
    responseMessage: ''
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
        .then(
          this.loginDataHandler()
        )
  }

  loginDataHandler = async () => {
    const { email, password } = this.state
    let response = await submitLoginData(email, password)
    if(response.status === 200) {
      debugger
      console.log("loginDATAHANDLER SUCCESS yaeeeaaa")
    } else {
      debugger
      this.setState({
        responseMessage: response
      })
    }
  }

  render() {
    let renderLogin
    let welcomeMessage
    let responseMessage

    if (this.props.currentUser.isSignedIn) {
      welcomeMessage = <Message> <h3 id="welcome-message">Hello {this.props.currentUser.attributes.email}</h3></Message>
    } 

    if(this.state.responseMessage){
      responseMessage = <p id="response-message">{this.state.responseMessage}</p>
    }

    if (this.state.renderLoginForm === true) {
      renderLogin = (
        <>
          <LoginForm 
            inputChangeHandlerProps={this.inputChangeHandler}
            handleLoginProps={this.handleLogin}
            loginDataHandlerProps={this.loginDataHandler}
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
        {responseMessage}

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