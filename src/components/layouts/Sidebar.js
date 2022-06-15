import React, { Component, Fragment } from 'react'
import defaultimg from '../../images/avatars/default.jpg'
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/Routes';
export default function Menu(props){

    console.log("logging props inside Sidebar menu",props);
    return (
      <Fragment>
      
{/* <!-- Main Sidebar Container --> */}
  <aside className="main-sidebar sidebar-dark-primary elevation-4">
     {/* Brand Logo  */}
    <a href="index3.html" className="brand-link">
      <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3"
           style={{ opacity:'.8' }}/>
      <span className="brand-text font-weight-light">Bursary application</span>
    </a>

    {/* Sidebar  */}
    <div className="sidebar">
      {/* <!-- Sidebar user panel (optional) --> */}
      <div className="user-panel mt-3 pb-3 mb-3 d-flex">
        <div className="image">
          <img src={defaultimg} className="img-circle elevation-2" alt="User Image"/>
        </div>
        <div className="info">
          <a href="#" className="d-block">{props.currentUser?.username}</a>
        </div>
      </div>

      {/* Sidebar Menu  */}
      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <li className="nav-item has-treeview menu-open">
            <Link to={ROUTES.MAINWITHFORWARDSLASH} className="nav-link active">
              <i className="nav-icon fas fa-tachometer-alt"></i>
              <p>
                Dashboard
                <i className="right fas fa-angle-left"></i>
              </p>
            </Link>
          </li>

         

       <li className="nav-item has-treeview menu-open">
            <a href="#" className="nav-link active" id="bursaryoptionsdropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="nav-icon fas fa-tachometer-alt"></i>
              <p>
                Bursary Options(sec schools)
                <i className="right fas fa-angle-left"></i>
              </p>
            </a>
            <div className="dropdown-menu" aria-labelledby="bursaryoptionsdropdown">
            <Link className="dropdown-item" to={ROUTES.BURSARYAPPLICATIONPERIOD}>Enter application period</Link>
            <Link className="dropdown-item" to={ROUTES.BURSARYAPPLICATIONURL}  >Apply</Link>
            <Link className="dropdown-item" to={ROUTES.BURSARYAPPLICATIONSAPPROVEDISAPPROVE}>Approve applications</Link>
            <Link className="dropdown-item" to={ROUTES.BURSARYAPPLICATIONSVIEWURL}>Show all applications</Link>
            {/* <Link className="dropdown-item" to={ROUTES.APPLICATIONBYSCHOOLCATEGORYURL}>Application by school category</Link> */}
            {/* <Link className="dropdown-item" to={ROUTES.BURSARYAPPLICATIONSVIEWBYSCHOOLURL}>Show  applications by school</Link> */}
            <Link className="dropdown-item" to={ROUTES.BURSARYAPPLICATIONAWARDS}>Awards</Link>


          </div>
            
          </li>  




          <li className="nav-item has-treeview menu-open">
            <a href="#" className="nav-link active" id="bursaryoptionsdropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="nav-icon fas fa-tachometer-alt"></i>
              <p>
                Bursary Options(higher learning)
                <i className="right fas fa-angle-left"></i>
              </p>
            </a>
            <div className="dropdown-menu" aria-labelledby="bursaryoptionsdropdown">
            <Link className="dropdown-item" to={ROUTES.BURSARYAPPLICATIONURLFORHIGHERLEARNING}  >Apply </Link>
            <Link className="dropdown-item" to={ROUTES.APPROVEDISAPPROVEHIGHERLEARNIGAPPLICATIONS}>Approve applications </Link>
            <Link className="dropdown-item" to={ROUTES.BURSARYAPPLICATIONSVIEWFORHIGHERLEARNING}>Show all applications </Link>
            <Link className="dropdown-item" to={ROUTES.HIGHERLEARNINGBURSARYAWARDS}>Awards</Link>


           
          </div>
            
          </li> 




          <li className="nav-item has-treeview menu-open">
            <a href="#" className="nav-link active" id="schooloptionsdropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="nav-icon fas fa-tachometer-alt"></i>
              <p>
                School Options 
                <i className="right fas fa-angle-left"></i>
              </p>
            </a>
            <div className="dropdown-menu" aria-labelledby="schooloptionsdropdown">
            <Link className="dropdown-item" to={ROUTES.SHOWALLSCHOOLS}>Show all schools</Link>
            <Link className="dropdown-item" to={ROUTES.ADDSCHOOL}>Add school </Link>
            <Link className="dropdown-item" to={ROUTES.SHOWALLHIGHERSCHOOLS}>Show all higher schools</Link>
            <Link className="dropdown-item" to={ROUTES.ADDHIGHERSCHOOL}>Add higher school</Link>

          </div>
            
          </li> 
             {/* counties */}
             <li className="nav-item has-treeview menu-open">
            <a href="#" className="nav-link active" id="schooloptionsdropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="nav-icon fas fa-tachometer-alt"></i>
              <p>
                Counties 
                <i className="right fas fa-angle-left"></i>
              </p>
            </a>
            <div className="dropdown-menu" aria-labelledby="schooloptionsdropdown">
            <Link className="dropdown-item" to={ROUTES.SHOWALLCOUNTIES}>Show all counties</Link>
            <Link className="dropdown-item" to={ROUTES.ADDCOUNTY}>Add county </Link>

          </div>
            
          </li> 

                  </ul>
      </nav>
     {/* sidebar-menu */}
    </div>
    {/* sidebar  */}
  </aside>


      </Fragment>
    )
  
}
