import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { registerUser } from '../state/actions/reduxTokenAuthConfig'
import { connect } from 'react-redux'
import SignUpForm from './SignUpForm'

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    password_confirmation: '',
    renderSignUpForm: false,
    responseMessage: ''
  }

  renderForm = () => {
    this.setState({
      renderSignUpForm: !this.state.renderSignUpForm
    })
  }

  inputChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSignUp = () => {
    const { registerUser } = this.props;
    const { email, password, password_confirmation } = this.state;
    registerUser({ email, password, password_confirmation })
      .then(
        console.log('You have successfully been signed up')
      )
      .catch(error => {
        this.setState({ responseMessage: error.response.data.errors.full_messages })
      })
  }

  render() {
    let renderSignUp
    let responseMessage
    let welcomeMessage

    if (this.props.currentUser.isSignedIn) {
      console.log('Welcome!')
    } else {
      if (this.state.renderSignUpForm) {
      renderSignUp = (
        <SignUpForm
          handleSignUp={this.handleSignUp}
          inputChangeHandler={this.inputChangeHandler}
        />
      )
    } else {
      renderSignUp = (
        <Button id="signup-button" onClick={this.renderForm}>Sign up</Button>
      )
    }
  }

    if (this.state.responseMessage !== '') {
      responseMessage = <p id="error-message">{this.state.responseMessage}</p>
    }

    return (
      <>
        {renderSignUp}
        {responseMessage}
        {welcomeMessage}
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
  registerUser
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp)
