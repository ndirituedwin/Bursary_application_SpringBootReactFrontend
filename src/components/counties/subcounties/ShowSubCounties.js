import React,{Fragment,useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import* as ROUTES from '../../../constants/Routes'
//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 
import { fetchallsubcountiess } from '../../../constants/ApiUtils';
export default function ShowSubsubcounties() {
    
    const [subcounties, setsubcounties] = useState([])
    const [subcountiesloading, setsubcountiesloading] = useState(true)
    const [subcountiesfetcherror, setsubcountiesfetcherror] = useState()
    useEffect(() => {
        fetchallsubcounties();
    }, [])
    const fetchallsubcounties=async ()=>{
    try {
            const resp = await fetchallsubcountiess();
            
            setsubcounties(resp); setsubcountiesloading(false);
            $(document).ready(function () {
                $('#example').DataTable();
            });
           console.log("response for subcounties ",resp.content)    
        } catch (error) {
            setsubcountiesfetcherror(error); setsubcountiesloading(false);
        }
   
    }


    let viewallsubcounties;
    if(subcountiesloading){
        viewallsubcounties=<img src="/images/misc/loading.gif" alt="Loading..." />

        
    }else{
        if(subcounties?.content.length>0){
            viewallsubcounties=subcounties?.content.map((sub,idx)=>{
        
            return <>   
            <tr key={idx}>
              <td>{sub?.subcounty}</td>
              <td>{sub.county?.county}</td>
               <td><Link className="btn btn-default" to={`${ROUTES.EDITSUBCOUNTY}${sub.id}`}>Details</Link></td>
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
<h1>subcounties</h1>
</div>
<div className="col-sm-6">
<ol className="breadcrumb float-sm-right">
  <li className="breadcrumb-item"><a href="#">Home</a></li>
  <li className="breadcrumb-item active">Sec subcounties</li>
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
    <h3 className="card-title">All subcounties </h3> 
  </div>
  <div className="card-body" >
    <table id="example" className="table table-bordered table-hover">
      <thead>
      <tr >
        <th>subcounty</th>
        <th>county</th>
        <th>Details</th>                            
        
      </tr>
      </thead>
      <tbody>
   {viewallsubcounties}
   </tbody>
      <tfoot>
      <tr >
        <th>subcounty</th>                          
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
