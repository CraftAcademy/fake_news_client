import React, { Component } from 'react';

class App extends Component {
  state = {
    renderLoginForm: false
  }

  renderForm = () => {
    this.setState({
      renderLoginForm: !this.state.renderLoginForm
    })
  }

  render() {

    let loginForm

    if (this.state.renderLoginForm) {
      loginForm = (
        <div id="login-form">
          <input id="email-input" placeholder="Email"/>
          <input id="password-input" type="password" placeholder="Password"/>
          <button id="submit-login-form">Submit</button>
        </div>
      )
    }

    return (
      <div>
        <h1>First scaffold</h1>

        <button onClick={this.renderForm} id="login-button">Login</button>

        {loginForm}

      </div>
    );
  }
}

export default App;
