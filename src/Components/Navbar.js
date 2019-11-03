import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      <nav id="navbar">
        <NavLink id='nav-home' to='/'>Home</NavLink>
        <NavLink id='nav-login' to='/login'>Login</NavLink>
        <NavLink id='nav-create' to='/create'>Create Article</NavLink>
      </nav>
    </>
  )
}

export default Navbar
