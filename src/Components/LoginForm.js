import React from 'react'

const LoginForm = (props) => {
  return (
    <>
      <div id="login-form">
        <input id="email-input" placeholder="Email" name="email" onChange={props.inputChangeHandlerProps}></input>
        <input id="password-input" placeholder="Password" name="password" onChange={props.inputChangeHandlerProps}></input>
        <button onClick={props.handleLoginProps} id="submit-login-form">Submit</button>
      </div>
    </>
  )
}

export default LoginForm