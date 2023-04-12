import React from 'react'
import { NavLink } from 'react-router-dom'


const Navbar = () => {
  return (
    <nav className="flex justify-between">
      <div>
        <NavLink to='/dashboard'>Dashboard</NavLink>
      </div>
      <div>
        <NavLink to=''>Home</NavLink>
      </div>
    </nav>
  )
}

export default Navbar