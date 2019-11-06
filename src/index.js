import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import "semantic-ui-css/semantic.min.css"
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import configureStore from './state/store/configureStore'
import "./i18n"

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
document.getElementById('root'))

serviceWorker.unregister()