import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../../images/Dynon-Logo-White.svg';
import '../NavBar/navbar.css'

const NavBar = () => {
  return (
    <div>
        <nav class="navbar navbar-dark bg-dark">
          <img className="img-fluid logo p-3" src={logo} alt="logo"></img>
          <div className="d-flex align-items-center">
              <Link className="nav-link text-white" to={'input-product'}>Add Product</Link>
              <Link className="nav-link text-white" to={'/'}>Worksheet</Link>
          </div>
        </nav>
    </div>
  )
}

export default NavBar