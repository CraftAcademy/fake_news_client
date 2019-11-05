import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'

const Navbar = ({currentUser}) => {
  return (
    <>
      <Menu stackable id="navbar">
        <Menu.Item>
          <NavLink id='nav-home' to='/'>Home</NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink id='nav-create' to='/create'>Create Article</NavLink>
        </Menu.Item>
        <Menu.Menu position='right'>
            {currentUser.isSignedIn === false && (
              <Menu.Item>
                <NavLink id='nav-login' to='/login'>
                  Login
                </NavLink>
              </Menu.Item>
            )}
            {currentUser.isSignedIn === false && (
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
