import React, { Fragment,useState,useEffect } from 'react'
import { fetchallhigherschools } from '../../../constants/ApiUtils';
import * as ROUTES from '../../../constants/Routes'
//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 
import { Link } from 'react-router-dom';
export default function ShowHigherSchools() {
  const [higherschools, sethigherschools] = useState([])
  const [schoolloading, setschoolloading] = useState(true)
  const [higherlearningerror, sethigherlearningerror] = useState()
  useEffect(() => {
    fetchhigherschools();
  }, [])
  const fetchhigherschools=async ()=>{
    try {
      const resp = await fetchallhigherschools();
      if (resp) {
        console.log("theresponsee ",resp)
        sethigherschools(resp);
        setschoolloading(false);
        $(document).ready(function () {
          $('#example').DataTable();
      });
      }
    } catch (error) {
      console.log("error ", error);
      sethigherlearningerror(error);
      setschoolloading(false)
    }
  }
  let higherlearningschools;
  if(schoolloading){
      higherlearningschools=<img src="/images/misc/loading.gif" alt="Loading..." />

      
  }else{
      if(higherschools?.content.length>0){
          higherlearningschools=higherschools?.content.map((school,idx)=>{
          //   return<><option key={school?.id} value={school?.id}>{school?.school}--{school?.county?.county}</option></>
      
          return <>   
          <tr key={idx}>
            <td>{school?.name}</td>
            <td>{school?.higherEducationnCategory?.category}</td>
          </tr>
          </>
      })
         }
  }
  return (
    <Fragment>
            <div className="content-wrapper">

<section className="content-header">
  <div className="container-fluid">
    <div className="row mb-2">
      <div className="col-sm-6">
        <h1>Schools</h1>
      </div>
      <div className="col-sm-6">
        <ol className="breadcrumb float-sm-right">
          <li className="breadcrumb-item"><a href="#">Home</a></li>
          <li className="breadcrumb-item active">Sec schools</li>
        </ol>
      </div>
    </div>
  </div>
</section>

<section className="content">
            <div className="container-fluid">
              <div className="card card-default">
             <div className="card-header">
               
          <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-2">              </div>
        </div> 
                </div>
                </div>
                </div>
                </section>
<section className="content" >
  <div className="container-fluid" >
  <div className="row" >
  <div className="col-12" >
  <div className="card" style={{ width:"100%" ,overflowX:"scroll",overflow:"scroll",overflowY:"scroll"}}>
          <div className="card-header">
            <h3 className="card-title">All schools </h3> 
          
          <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-3">

          <Link to={ROUTES.ADDHIGHERSCHOOL} className="btn btn-info pull-right">Add School</Link>
                    </div>
                    <div className="col-md-3">
          <Link to={ROUTES.ADDHIGHERSCHOOLCATEGORY} className="btn btn-info pull-right">Add School category</Link>

                    </div>
                </div>
          </div>
          <div className="card-body" >
            <table id="example" className="table table-bordered table-hover">
              <thead>
              <tr >
                <th>School</th>
                <th>category</th>
                                           
                
              </tr>
              </thead>
              <tbody>
           {higherlearningschools}
           </tbody>
              <tfoot>
              <tr >
                <th>School</th>
                <th>category</th>
                
                 
                
              </tr>
              </tfoot>
            </table>
          </div>
        
        </div>
       
      </div>
      
    </div>
  
  </div>

</section>

</div>

        </Fragment>
  )
}
