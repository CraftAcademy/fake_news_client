import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      <nav>
        <NavLink to='/create'>Home</NavLink>
        <NavLink to='/login'>Login</NavLink>
      </nav>
    </>
  )
}

export default Navbar
