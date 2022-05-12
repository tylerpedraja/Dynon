import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../../images/Dynon-Logo-White.svg';
import '../NavBar/navbar.css'

const NavBar = () => {
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <Link to={'/'}>
          <img className="img-fluid logo p-3" src={logo} alt="logo" />
        </Link>
        <div className="d-flex align-items-center">
          <Link className="nav-link text-white" to={'product-manager'}>Manage Products</Link>
          <Link className="nav-link text-white" to={'/'}>Worksheet</Link>
        </div>
      </nav>
    </div>
  )
}

export default NavBar