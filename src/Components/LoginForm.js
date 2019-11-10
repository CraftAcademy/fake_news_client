import React from 'react'
import { Container, Input, Button } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'

const LoginForm = (props) => {
  const { t } = useTranslation()

  return (
    <>
      <Container id="login-form">
        <h2 id="login-header">{t("login.message")}</h2>
        <div className="input">
          <Input placeholder={t("login.email")} id="email-input" name="email" onChange={props.inputChangeHandlerProps} />
        </div>
        <div className="input">
          <Input id="password-input" type="password" placeholder={t("login.password")} name="password" onChange={props.inputChangeHandlerProps} />
        </div>
        <div className="button">
          <Button color='blue' type="submit" onClick={props.handleLoginProps} id="submit-login-form">{t("login.submit")}</Button>
        </div>
      </Container>
    </>
  )
}

export default LoginForm