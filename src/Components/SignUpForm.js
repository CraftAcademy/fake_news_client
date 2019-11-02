import React from 'react'
import { Button } from 'semantic-ui-react'

const SignUpForm = (props) => {
  return (
    <div id="signup-form">
      <input onBlur={props.inputChangeHandler} name="email" placeholder="Email" id="email-input"/>
      <input onBlur={props.inputChangeHandler} name="password" placeholder="Password" id="password-input"/>
      <input onBlur={props.inputChangeHandler} name="password_confirmation" placeholder="Password confirmation" id="password-confirmation"/>
      <Button color='blue' onClick={props.handleSignUp} id="submit-signup-form">Submit</Button>
    </div>
  )
}

export default SignUpForm
