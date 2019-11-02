import React from 'react'
import { Message } from 'semantic-ui-react'
import FlashMessage from 'react-flash-message'

const AlertModal = () => {
  return (
  <FlashMessage duration={5000}>
    <Message>You need to be logged in to view this article.</Message>
  </FlashMessage>
  )
}
 
export default AlertModal