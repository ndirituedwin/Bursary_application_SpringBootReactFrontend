import React,{Fragment,useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import* as ROUTES from '../../constants/Routes'
//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 
import { fetchallcountiess } from '../../constants/ApiUtils';
export default function ShowCounties() {
    
    const [counties, setcounties] = useState([])
    const [countiesloading, setcountiesloading] = useState(true)
    const [countiesfetcherror, setcountiesfetcherror] = useState()
    useEffect(() => {
        fetchallcounties();
    }, [])
    const fetchallcounties=async ()=>{
    try {
            const resp = await fetchallcountiess();
            
            setcounties(resp); setcountiesloading(false);
            $(document).ready(function () {
                $('#example').DataTable();
            });
           console.log("response for counties ",resp.content)    
        } catch (error) {
            setcountiesfetcherror(error); setcountiesloading(false);
        }
   
    }


    let viewallcounties;
    if(countiesloading){
        viewallcounties=<img src="/images/misc/loading.gif" alt="Loading..." />

        
    }else{
        if(counties?.content.length>0){
            viewallcounties=counties?.content.map((county,idx)=>{
        
            return <>   
            <tr key={idx}>
              <td>{county?.county}</td>
              <td>{county?.code}</td>
               <td><Link className="btn btn-default" to={`${ROUTES.EDITCOUNTY}${county.code}`}>Details</Link></td>
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
<h1>counties</h1>
</div>
<div className="col-sm-6">
<ol className="breadcrumb float-sm-right">
  <li className="breadcrumb-item"><a href="#">Home</a></li>
  <li className="breadcrumb-item active">Sec counties</li>
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
    <h3 className="card-title">All counties </h3> 
  </div>
  <div className="card-body" >
    <table id="example" className="table table-bordered table-hover">
      <thead>
      <tr >
        <th>county</th>
        <th>code</th>
        <th>Details</th>                            
        
      </tr>
      </thead>
      <tbody>
   {viewallcounties}
   </tbody>
      <tfoot>
      <tr >
      <th>county</th>
        <th>code</th>                          
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
