import React, { Component } from 'react'

class LoginForm extends Component {
  render() {
    return (
      <>
        <form id="login-form">
          <input id="email-input" placeholder="Email" name="email" onChange={this.props.inputChangeHandlerProps}></input>
          <input id="password-input" placeholder="Password" name="password" onChange={this.props.inputChangeHandlerProps}></input>
          <button id="submit-login-form">Submit</button>
        </form>
      </>
    )
  }
}

export default LoginForm
