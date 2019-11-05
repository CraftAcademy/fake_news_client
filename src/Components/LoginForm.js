import React from 'react'
import { Container, Input, Button } from 'semantic-ui-react'

const LoginForm = (props) => {
   return (
    <>
      <Container id="login-form">
        <div id="input">
          <Input placeholder="Email" id="email-input" name="email" onChange={props.inputChangeHandlerProps}>
            <input />
          </Input>
        </div>
        <div id="input">
          <Input id="password-input" placeholder="Password" name="password" onChange={props.inputChangeHandlerProps}>
            <input />
          </Input>
        </div>
        <div id="button">
          <Button color='blue' onClick={props.handleLoginProps} id="submit-login-form">Submit</Button>
        </div>
      </Container>
    </>
  )
}

export default LoginForm