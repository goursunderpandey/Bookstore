import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useAuth } from './AuthContext';
import { NavLink } from 'react-router-dom';

const Navbars = () => {
  const { user ,logout } = useAuth();
  
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
    <div className="container-fluid">
      <NavLink className="navbar-brand" to="#">
       My Bookstore 
      </NavLink>
     
     {user?.user?.role === "author" &&  <NavLink to="/Addbooks" className="btn btn-outline btn-lg m-1" role="button">  Add Books </NavLink> }
   
 
     
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      {!user ?   <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
        <form className="d-flex" role="search">
          
          <NavLink className="btn btn-outline-success m-2" type="submit" to="/login">
            Login
          </NavLink>
        </form>
        <form className="d-flex" role="search">
          <NavLink className="btn btn-outline-success m-2" type="submit" to="/signup">
            Signup
          </NavLink>
        </form>
      </div> :   <form className="d-flex" role="search">
          
          <NavLink className="btn btn-outline-success m-2" type="submit" onClick={logout}>
            Logout 
          </NavLink>
        </form>  }

      
      
    </div>
  </Navbar>
  )
}

export default Navbars