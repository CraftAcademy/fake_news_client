import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'

const Navbar = (props) => {
  return (
    <>
      <Menu stackable id="navbar">
        <Menu.Item>
          <NavLink id='nav-home' to='/'>Home</NavLink>
        </Menu.Item>
        {props.currentUser.attributes.role === 'journalist' && (
          <Menu.Item>
            <NavLink id='nav-create' to='/create'>Create Article</NavLink>
          </Menu.Item>
        )}
        <Menu.Menu position='right'>
        {props.currentUser.isSignedIn && (
            <Menu.Item>
              <NavLink id='nav-payment' to='/payment'>
                Subscribe
              </NavLink>
            </Menu.Item>
          )}
          {!props.currentUser.isSignedIn && (
            <Menu.Item>
              <NavLink id='nav-login' to='/login'>
                Login
              </NavLink>
            </Menu.Item>
          )}
          {!props.currentUser.isSignedIn && (
            <Menu.Item>
              <NavLink id='nav-signup' to='/signup'>
                Signup
                </NavLink>
            </Menu.Item>
          )}
        </Menu.Menu>
      </Menu>
    </>
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.reduxTokenAuth.currentUser
  }
}

export default connect(
  mapStateToProps
)(Navbar)
