import React, { Component } from 'react'
import { signOutUser } from '../state/actions/reduxTokenAuthConfig'
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

class Logout extends Component {
  state = {
    responseMessage: ''
  }

  handleSignout = (e) => {
    e.preventDefault()
    const { signOutUser } = this.props
      signOutUser()
        .then(
          console.log('You are successfully logged out')
        )
        .catch(error => {
          this.setState({responseMessage: error.response.data.errors})
        })
  }

  render() {
    let responseMessage, logout
    const { handleSignout } = this

    if(this.props.currentUser.isSignedIn) {
      logout = (
        <Menu.Item>
          <NavLink id='nav-logout' to='/logout' onClick={handleSignout}>Logout</NavLink>
        </Menu.Item>
      )
    }

    if(this.state.responseMessage !== '') {
      responseMessage = this.state.responseMessage
    }

    return (
      <>
        {logout}
        {responseMessage}
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    state: state,
    currentUser: state.reduxTokenAuth.currentUser
  }
}

const mapDispatchToProps = {
  signOutUser
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout)