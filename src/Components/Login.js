import React, { Component }from 'react'
import LoginForm from './LoginForm'
import { signInUser } from '../state/actions/reduxTokenAuthConfig'
import { connect } from 'react-redux'

class Login extends Component {
  state = {
    email: '',
    password: '',
    responseMessage: ''
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
    let responseMessage

    if (!this.props.currentUser.isSignedIn) {
      renderLogin = (
        <>
          <LoginForm 
            inputChangeHandlerProps={this.inputChangeHandler}
            handleLoginProps={this.handleLogin}
          />
        </>
      )
    }

    if(this.state.responseMessage !== ''){
      responseMessage = <p id="error-message">{this.state.responseMessage}</p>
    }

    return (
      <>
        {renderLogin}
        {responseMessage}
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
)(Login)