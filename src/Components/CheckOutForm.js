import React, { Component } from "react"
import { Button, Card } from 'semantic-ui-react'
import { connect } from 'react-redux'
import getCredentials from '../Modules/GetCredentials'
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe
} from "react-stripe-elements"
import axios from "axios"

class CheckOutForm extends Component {
  state = {
    error: false,
    loading: false,
    responseMessage: ''
  }

  payWithStripe = async e => {
    e.preventDefault();
    this.setState({ loading: true })
    await this.props.stripe.createToken().then(({ token }) => {
      if (token) {
        this.payment(token.id)
      } else {
        this.setState({ error: true, loading: false })
      }
    })
  }

  payment = async stripeToken => {
    try {
      let response = await axios.post('http://localhost:3000/v1/payments', {
        stripeToken
      },
        { headers: getCredentials() }
      );
      if (response.status === 200) {
        this.setState({ responseMessage: response.data.message })
      }
    } catch (error) {
      this.setState({ loading: false })
      this.setState({ responseMessage: error.response.data.message })
    }
  };

  render() {
    let renderSubscribeForm
    let error

    if (this.props.currentUser.isSignedIn) {
      renderSubscribeForm = (
        <div id="payment-form">
          <label>Please select a subscription plan:</label>
          <Card>
            <Card.Content header="Yearly" />
            <Card.Content description="1000 SEK" />
          </Card>
          <label>Credit card number:</label>
          <div id="card-number-element"><CardNumberElement /></div>
          <label>Expiration date:</label>
          <CardExpiryElement />
          <label>CVC:</label>
          <CardCVCElement />
          <Button onClick={this.payWithStripe} id="submit-payment">
            Submit Payment
          </Button>
        </div>
      )
    }

    if (this.state.error) {
      error = <p id="invalid-credentials">Something went wrong, please try again</p>
    }

    return (
      <div>
        {renderSubscribeForm}
        <p id="payment-feedback-message">{this.state.responseMessage}</p>
        {error}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.reduxTokenAuth.currentUser
  }
}

export default injectStripe(
  connect(
    mapStateToProps
  )(CheckOutForm)
)
