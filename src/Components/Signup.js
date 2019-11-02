import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

class Signup extends Component {
  state = {
    renderSignupForm: false
  }

  renderForm = () => {
    this.setState({
      renderSignupForm: !this.state.renderSignupForm
    })
  }

  render() {
    let renderSignup

    if (this.state.renderSignupForm) {
      <SignupForm />
    } else {
      renderSignup = (
        <Button id="signup" onClick={this.renderForm}>Signup</Button>
      )
    }

    return (
      <>
        {renderSignup}
      </>
    )
  }
}

export default Signup
