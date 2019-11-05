import React from 'react'
import { Container, Input, Button } from 'semantic-ui-react'

const LoginForm = (props) => {
   return (
    <>
      <Container id="login-form">
        <div className="input">
          <Input placeholder="Email" id="email-input" name="email" onChange={props.inputChangeHandlerProps}>
            <input />
          </Input>
        </div>
        <div className="input">
          <Input id="password-input" type="password" placeholder="Password" name="password" onChange={props.inputChangeHandlerProps}>
            <input />
          </Input>
        </div>
        <div className="button">
          <Button color='blue' type="password" onClick={props.handleLoginProps} id="submit-login-form">Submit</Button>
        </div>
      </Container>
    </>
  )
}

export default LoginForm