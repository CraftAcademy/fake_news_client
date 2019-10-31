import React from 'react'
import { Container, Input, Icon, Button } from 'semantic-ui-react'

const LoginForm = (props) => {
   return (
    <>
      <Container id="login-form">
        <Input iconPosition='left' placeholder="Email" id="email-input" name="email" onChange={props.inputChangeHandlerProps}>
          <Icon name='at' />
          <input />
        </Input>
        <Input id="password-input" placeholder="Password" name="password" onChange={props.inputChangeHandlerProps}>
          <input />
        </Input>
        <Button color='blue' onClick={props.handleLoginProps} id="submit-login-form">Submit</Button>
      </Container>
    </>
  )
}

export default LoginForm