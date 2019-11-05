import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import "semantic-ui-css/semantic.min.css"
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import configureStore from './state/store/configureStore'
import { Elements, StripeProvider } from "react-stripe-elements";
import { BrowserRouter } from 'react-router-dom'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <StripeProvider apiKey="pk_test_BKEQsR0FbRiozFhpNap9zJ0X002ENjjshn">
        <Elements>
          <App />
        </Elements>
      </StripeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'))

serviceWorker.unregister()