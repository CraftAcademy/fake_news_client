import React from 'react'
import { Button, Input } from 'semantic-ui-react'

const SignUpForm = (props) => {
  return (
    <div id="signup-form">
      <div className="input">
        <Input onBlur={props.inputChangeHandler} name="email" placeholder="Email" id="email-input"/>
      </div>
      <div className="input">
        <Input onBlur={props.inputChangeHandler} name="password" type="password" placeholder="Password" id="password-input"/>
      </div>
      <div className="input">
        <Input onBlur={props.inputChangeHandler} name="password_confirmation" type="password" placeholder="Password confirmation" id="password-confirmation"/>
      </div>
      <div className="button">
        <Button color='blue' onClick={props.handleSignUp} id="submit-signup-form">Submit</Button>
      </div>
    </div>
  )
}

export default SignUpForm
