import React, { Component } from 'react'
import ListArticles from './Components/ListArticles'

class App extends Component {
  state = {
    renderLoginForm: false,
    email: '',
    password: ''
  }

  renderForm = () => {
    this.setState ({
      renderLoginForm: !this.state.renderLoginForm
    })
  }

  inputChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    let renderLogin

    if (this.state.renderLoginForm) {
      renderLoginForm = (
        <>
          <LoginForm 
          inputChangeHandlerProps={this.inputChangeHandler}
          />
        </>
      )
    } else {
      <button id="login-button" onClick={this.renderForm}>Login</button>
    }

    return (
      <>
        {renderLoginForm}

        <ListArticles />
      </>
    )
  }
}

export default App
