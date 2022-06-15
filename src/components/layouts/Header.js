import React, { Component, Fragment,useEffect } from 'react'
import { useNavigate } from 'react-router';
import * as ROUTES from '../../constants/Routes'

export default function Header(props) {
  console.log("logging props inside headercomponent ",props);
  const navigate=useNavigate();
  useEffect(() => {
    if(!(props.isAuthenticated)){
      // navigate(ROUTES.HOME);
    }
  }, [props.isAuthenticated])
  const handleLogout=(event)=>{
    event.preventDefault();
    props.handleLogout();

  }


  let signinorsignout="";
  if(!props.currentUser || !props.isAuthenticated){
      // navigate(ROUTES.HOME)
  }else{
    signinorsignout=<>
     <div className="dropdown-divider"></div>
          <a href="#" className="dropdown-item">
            <i className="mr-3"></i>{props.currentUser.username}
          </a>
      <div className="dropdown-divider"></div>
    <form action="" onSubmit={handleLogout}>
    <button className='btn btn-default dropdown-item' > <i className="fas fa-sign-out" aria-hidden="true"></i> Signout</button>
    </form> 
    </>
  }
    return (
      <Fragment>
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#"><i className="fas fa-bars"></i></a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href="index3.html" className="nav-link">Home</a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href="#" className="nav-link">Contact</a>
        </li>
      </ul>
        <form className="form-inline ml-3">
        <div className="input-group input-group-sm">
          <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search"/>
          <div className="input-group-append">
            <button className="btn btn-navbar" type="submit">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </form>
        <ul className="navbar-nav ml-auto"> 
        <li className="nav-item dropdown">
          <a className="nav-link" data-toggle="dropdown" href="#">
            <i className="far fa-user"></i>
          </a>
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          
           {signinorsignout}          
          </div>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#">
            <i className="fas fa-th-large"></i>
          </a>
        </li>
      </ul>
    </nav>  
      </Fragment>
    )
  
}
