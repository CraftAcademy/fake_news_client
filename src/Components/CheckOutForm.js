import React, { Component } from "react"
import { Button, Form, Card } from 'semantic-ui-react'
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
      });
      if (response.status === 204) {
        this.setState({ responseMessage: response.data.message })
      }
    } catch (error) {
      this.setState({ loading: false })
      this.setState({ responseMessage: error.response.data.message })
    }
  };

  render() {
    let renderSubscribeForm

    if (this.props.currentUser.isSignedIn) {
      renderSubscribeForm = (
        <Form id="payment-form">
          <Form.Field>
            <label>Please select a subscription plan:</label>
            <Form.Field>
              <Card>
                <Card.Content header="Yearly" />
                <Card.Content description="1000 SEK" />
              </Card>
            </Form.Field>
          </Form.Field>
          <Form.Field>
            <label>Credit card number:</label>
          <Form.Field>
          <CardNumberElement />
            </Form.Field>
          </Form.Field >
        <Form.Field>
          <label>Expiration date:</label>
          <Form.Field>
            <CardExpiryElement />
          </Form.Field>
        </Form.Field>
        <Form.Field>
          <label>CVC:</label>
          <Form.Field>
            <CardCVCElement />
          </Form.Field>
        </Form.Field>
        <Form.Field>
          <Button onClick={this.payWithStripe} id="submit-payment">
            Submit Payment
          </Button>
        </Form.Field>
        </Form>
          )
    }

    if(this.state.error) {
      <p id="unsuccessful-payment">Something went wrong, please try again</p>
    }

    return (
      <div>
        {renderSubscribeForm}
        <p id="successful-payment">{this.state.responseMessage}</p>
        {error}
      </div>
    )
  }
}

export default injectStripe(CheckOutForm)
