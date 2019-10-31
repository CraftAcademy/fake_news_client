import React, { Component }from 'react'
import LoginForm from './LoginForm'
import { Button, Message } from 'semantic-ui-react'
import { signInUser } from '../state/actions/reduxTokenAuthConfig'
import { connect } from 'react-redux'

class Login extends Component {
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
        .catch(error => {
          this.setState({responseMessage: error.response.data.errors})
        })
  }

  render(){
    let renderLogin
    let welcomeMessage
    let responseMessage

    if (this.props.currentUser.isSignedIn) {
      welcomeMessage = <Message> <h3 id="welcome-message">Hello {this.props.currentUser.attributes.email}</h3></Message>
    } else {
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
        )
      }
    }

    if(this.state.responseMessage !== ''){
      responseMessage = <p id="error-message">{this.state.responseMessage}</p>
    }

    

    return (
      <>
        {renderLogin}
        {welcomeMessage}
        {responseMessage}
      </>
  )
}}

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
)(Login)