import React from 'react'
import { NavLink } from 'react-router-dom'

const CategoryBar = (props) => {
  return (
    <>
        <NavLink id='nav-politics' to='/politics'>Politics</NavLink>
    </>
  )
}

export default CategoryBar