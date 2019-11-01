import React from 'react'
import { Modal } from 'semantic-ui-react'

const ModalModalExample = () => (
  <Modal id="flash-message">
    <Modal.Header>You need to be logged in to view this article.</Modal.Header>
    <Modal.Content>
        <Modal.Header>Please proceed to the login page.</Modal.Header>
    </Modal.Content>
  </Modal>
)

export default ModalModalExample