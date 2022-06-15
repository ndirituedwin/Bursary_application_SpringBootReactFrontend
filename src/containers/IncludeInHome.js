import React, { Fragment } from 'react'
import * as ROUTES from '../constants/Routes'
import { Link } from 'react-router-dom'

export default function IncludeInHome() {
  return (
    <Fragment>
         {/* <!-- Topbar Start --> */}

 <div className="container-fluid d-none d-lg-block" style={{ backgroundColor:"whitesmoke" }}>
  <div className="row align-items-center py-4 px-xl-5">
    <div className="col-lg-3">
     
        <Link to={ROUTES.HOME}>Bursary Applications</Link>
    </div>
   
    <div className="col-lg-3 text-right">
     
    </div>
    <div className="col-lg-3 text-right">
      <div className="d-inline-flex align-items-center">
        <i className="fa fa-2x fa-envelope text-primary mr-3" />
        <div className="text-left">
          <h6 className="font-weight-semi-bold mb-1">Email Us</h6>
          <small>youremail@email.com</small>
        </div>
      </div>
    </div>
    <div className="col-lg-3 text-right">
      <div className="d-inline-flex align-items-center">
        <div className="text-left">
        <Link to={ROUTES.SIGNINCOMPONENT}>SignIn</Link>
        </div>
      </div>
    </div>
  </div>
</div>

   {/* <!-- Topbar End --> */}


   {/* <!-- Carousel Start --> */}
   <div className="container-fluid p-0 pb-5 mb-5">
  <div id="header-carousel" className="carousel slide carousel-fade" data-ride="carousel">
    <ol className="carousel-indicators">
      <li data-target="#header-carousel" data-slide-to={0} className="active" />
      <li data-target="#header-carousel" data-slide-to={1} />
      <li data-target="#header-carousel" data-slide-to={2} />
    </ol>
    <div className="carousel-inner">
      <div className="carousel-item active" style={{minHeight: 300}}>
        <img className="position-relative w-100" src="img/carousel-1.jpg" style={{minHeight: 300, objectFit: 'cover'}} />
        <div className="carousel-caption d-flex align-items-center justify-content-center">
          <div className="p-5" style={{width: '100%', maxWidth: 900}}>
            <h5 className="text-white text-uppercase mb-md-3">Best Online Courses</h5>
            <h1 className="display-3 text-white mb-md-4">Best Education From Your Home</h1>
            <a href className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold mt-2">Learn More</a>
          </div>
        </div>
      </div>
      <div className="carousel-item" style={{minHeight: 300}}>
        <img className="position-relative w-100" src="img/carousel-2.jpg" style={{minHeight: 300, objectFit: 'cover'}} />
        <div className="carousel-caption d-flex align-items-center justify-content-center">
          <div className="p-5" style={{width: '100%', maxWidth: 900}}>
            <h5 className="text-white text-uppercase mb-md-3">Best Online Courses</h5>
            <h1 className="display-3 text-white mb-md-4">Best Online Learning Platform</h1>
            <a href className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold mt-2">Learn More</a>
          </div>
        </div>
      </div>
      <div className="carousel-item" style={{minHeight: 300}}>
        <img className="position-relative w-100" src="img/carousel-3.jpg" style={{minHeight: 300, objectFit: 'cover'}} />
        <div className="carousel-caption d-flex align-items-center justify-content-center">
          <div className="p-5" style={{width: '100%', maxWidth: 900}}>
            <h5 className="text-white text-uppercase mb-md-3">Best Online Courses</h5>
            <h1 className="display-3 text-white mb-md-4">New Way To Learn From Home</h1>
            <a href className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold mt-2">Learn More</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    {/* <!-- Carousel End --> */}
    </Fragment>
  )
}
