import React from 'react'
import { Button, Input } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'

const SignUpForm = (props) => {
  const { t } = useTranslation()

  return (
    <div id="signup-form">
      <h2 id="signup-header">{t("signup.message")}</h2>
      <div className="input">
        <Input onBlur={props.inputChangeHandler} name="email" placeholder={t("signup.email")} id="email-input"/>
      </div>
      <div className="input">
        <Input onBlur={props.inputChangeHandler} name="password" type="password" placeholder={t("signup.password")} id="password-input"/>
      </div>
      <div className="input">
        <Input onBlur={props.inputChangeHandler} name="password_confirmation" type="password" placeholder={t("signup.password_c")} id="password-confirmation"/>
      </div>
      <div className="button">
        <Button color='blue' onClick={props.handleSignUp} id="submit-signup-form">{t("signup.submit")}</Button>
      </div>
    </div>
  )
}

export default SignUpForm
