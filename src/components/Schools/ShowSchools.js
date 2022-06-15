import React,{Fragment,useEffect,useState} from 'react'
import* as ROUTES from '../../constants/Routes'
//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 
import { fetchsecschools } from '../../constants/ApiUtils';
import {Link} from 'react-router-dom';
export default function ShowSchools() {

    const [secschools, setsecschools] = useState([])
    const [secschoolloading, setsecschoolloading] = useState(true)
    const [secschoolsfetcherror, setsecschoolsfetcherror] = useState()
    useEffect(() => {
        fetchallsecschools();
    }, [])
    const fetchallsecschools=async ()=>{
    try {
            const resp = await fetchsecschools();
            
            setsecschools(resp); setsecschoolloading(false);
            $(document).ready(function () {
                $('#example').DataTable();
            });
           console.log("response ",resp.content)    
        } catch (error) {
            setsecschoolsfetcherror(error); setsecschoolloading(false);
        }
   
    }


    let viewallschools;
    if(secschoolloading){
        viewallschools=<img src="/images/misc/loading.gif" alt="Loading..." />

        
    }else{
        if(secschools?.content.length>0){
            viewallschools=secschools?.content.map((school,idx)=>{
            //   return<><option key={school?.id} value={school?.id}>{school?.school}--{school?.county?.county}</option></>
        
            return <>   
            <tr key={idx}>
              <td>{school?.school}</td>
              <td>{school?.category?.category}</td>
              <td>{school?.type?.type}</td>
              <td>{school?.county?.county}</td>             
               <td><Link className="btn btn-default" to={`${ROUTES.EDITSCHOOL}${school.id}`}>Details</Link></td>
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
          {/* <div className="col-md-10">{this?.state?.serverresponse && <span className="help-block text-danger card-title">{(this?.state?.serverresponse?.message? this?.state?.serverresponse?.message:this?.state?.serverresponse?.body?.message)}</span> }</div> */}
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
          </div>
          <div className="card-body" >
            <table id="example" className="table table-bordered table-hover">
              <thead>
              <tr >
                <th>School</th>
                <th>category</th>
                <th>type</th>
                <th>county</th>                            
                <th>Details</th>                            
                
              </tr>
              </thead>
              <tbody>
           {viewallschools}
           </tbody>
              <tfoot>
              <tr >
                <th>School</th>
                <th>category</th>
                <th>type</th>
                <th>county</th> 
                <th>Details</th> 
                 
                
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

