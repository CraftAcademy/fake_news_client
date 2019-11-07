import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import "semantic-ui-css/semantic.min.css"
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import configureStore from './state/store/configureStore'
import "./i18n"
import { Elements, StripeProvider } from "react-stripe-elements"
import { BrowserRouter } from 'react-router-dom'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <StripeProvider apiKey={process.env.REACT_APP_STRIPE_API_KEY}>
        <Elements>
          <App />
        </Elements>
      </StripeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'))

serviceWorker.unregister()