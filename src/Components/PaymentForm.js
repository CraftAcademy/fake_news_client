import React, { Component } from "react"
import { Button, Select, Label } from 'semantic-ui-react'
import { connect } from 'react-redux'
import getCredentials from '../Modules/GetCredentials'
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe
} from "react-stripe-elements"
import axios from "axios"
import './CSS/CheckOutForm.css'

class PaymentForm extends Component {
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
    const { t } = this.props;
    const subscriptionOptions = [
      { key: 'one', value: 'one', text:`${t("payment.text")}` }
    ]

    if (this.props.currentUser.isSignedIn) {
      renderSubscribeForm = (
        <div id="payment-form">
          <Label pointing='below'>{t("payment.option")}</Label>
          <Select id="select-option" placeholder={t("payment.option_c")} options={subscriptionOptions} />
          <div>
          <Label className="payment__label" pointing='below'>{t("payment.credit")}</Label>
          <div id="card-number-element"><CardNumberElement /></div>
          <Label className="payment__label" pointing='below'>{t("payment.expiry")}</Label>
          <CardExpiryElement />
          <Label className="payment__label" pointing='below'>{t("payment.cvc")}</Label>
          <CardCVCElement />
          </div>
          <Button onClick={this.payWithStripe} id="submit-payment" className="submit-payment">
          {t("payment.submit")}
          </Button>
        </div>
      )
    }

    if (this.state.error) {
      error = <p className="p__error" id="invalid-credentials">Something went wrong, please try again</p>
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
  )(PaymentForm)
)
