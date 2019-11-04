import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'

class PaymentForm extends Component {

  render() {
    let renderSubscribeForm

    if(this.props.currentUser.isSignedIn) {
      renderSubscribeForm = (
        <h1>Hello</h1>
      )
    } else {
      renderSubscribeForm = (
        <Button id="subscribe-button">Subscribe</Button>
      )
    }

    return (
      <div>
        {renderSubscribeForm}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.reduxTokenAuth.currentUser
  }
}

export default connect(
  mapStateToProps
)(PaymentForm);

