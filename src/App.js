import React, { Component } from 'react'
import ListArticles from './Components/ListArticles'
import LoginForm from './Components/LoginForm'

class App extends Component {
  state = {
    renderLoginForm: false,
    email: '',
    password: ''
  }

  renderForm = () => {
    this.setState ({
      renderLoginForm: true
      // renderLoginForm: !this.state.renderLoginForm
    })
  }

  inputChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    let renderLogin

    if (this.state.renderLoginForm === true) {
      renderLogin = (
        <>
          <LoginForm 
          inputChangeHandlerProps={this.inputChangeHandler}
          />
        </>
      )
    } else {
      renderLogin = (
      <button id="login-button" onClick={this.renderForm}>Login</button>
      )}

    return (
      <>
        {renderLogin}

        <ListArticles />
      </>
    )
  }
}

export default App
