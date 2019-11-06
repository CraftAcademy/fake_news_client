import React from 'react'
import { Message } from 'semantic-ui-react'
import FlashMessage from 'react-flash-message'
import { useTranslation } from 'react-i18next'

const AlertModal = () => {
  const { t } = useTranslation()

  return (
  <FlashMessage duration={5000} >
    <Message id="flash-message">{t("flash.alert")}</Message>
  </FlashMessage>
  )
}
 
export default AlertModal