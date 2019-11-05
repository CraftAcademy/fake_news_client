import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

const Navbar = ({currentUser}) => {
  return (
    <>
      <nav id="navbar">
        <NavLink id='nav-home' to='/'>Home</NavLink>
        {currentUser.isSignedIn === false && (
          <NavLink id='nav-login' to='/login'>
            Login
          </NavLink>
        )}
        {currentUser.isSignedIn === false && (
          <NavLink id='nav-signup' to='/signup'>
            Signup
          </NavLink>
        )}
        <NavLink id='nav-create' to='/create'>Create Article</NavLink>
      </nav>
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
