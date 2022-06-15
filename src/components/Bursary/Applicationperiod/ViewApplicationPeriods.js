

import React, { Fragment,useState,useEffect } from 'react'
import { updateapplicationeriodisopen, viewapplicationperiods,checkforopenapplicationperiods } from '../../../constants/ApiUtils'
import ApplicationPeriodDialog from '../../Dialog/ApplicationPeriodDialog';
import Dialog from '../../Dialog/Dialog';
//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 
export default function ViewApplicationPeriods() {

  const [dialog, setDialog] = useState({message:"",isLoading:false,thisClicked:"",periodId:null})
    const [isloading, setisloading] = useState(true)
    const [applicationperiods, setapplicationperiods] = useState([])
    const [error, seterror] = useState([])
    const [serverresponse, setserverresponse] = useState([])
    const [openclose, setopenclose] = useState()
    useEffect(() => {
        viewapplicationperiods().then((resp)=>{
              setapplicationperiods(resp)  
              setisloading(false)
              
        }).catch((error)=>{
            console.log("error ",error)
            seterror(error)
            setisloading(false)
        })
    }, [openclose])
    const updateisOpen=(e,periodId)=>{
      e.preventDefault();
      const thisClicked=e.currentTarget;
      checkifthereisopenapplicationperiods(thisClicked,periodId);
    }
    const updateapplicationperiodIsopenstatus=async (thisClicked,periodId)=>{
      console.log("thisClicked.innerText ",thisClicked.innerText)
      console.log("periodId ",periodId)
        try {
        const resp = await updateapplicationeriodisopen(periodId);
        console.log("logging response ", resp);
        if (resp === true) {
          setopenclose('Open')
        } else if (resp === false) {
          setopenclose('Closed')
        }
      } catch (exception) {
        console.log("error", exception);
      }
    }

  
    const checkifthereisopenapplicationperiods=async (thisClicked,periodId)=>{
          console.log("setopencosesetopencose ",openclose)
        try {
        const resp = await checkforopenapplicationperiods(periodId);
           if (resp===true) {
             setopenclose('Open')
        }else if(resp===false){
          setopenclose('Closed')
        }else if(resp?.message){
          setopenclose('Both')
          handleDialog(resp.message, true, thisClicked,periodId);

        }
      
      } catch (err) {
        console.log("error occurred while checking for open application periods");
      }

    }
    const handleDialog=(message,isLoading,thisClicked,periodId)=>{
      setDialog({
        message,isLoading,thisClicked,periodId
      })
    }
    const areYouSure=(choose,thisClicked,periodId)=>{
     
      if(choose){
        //close the open period and se open the current one
        handleDialog("", false);
        updateapplicationperiodIsopenstatus(thisClicked,periodId)

      }else{
        handleDialog("",false);
      }
    }


    let applicationperiodss;
    if (isloading) {
        applicationperiodss=<img src="/images/misc/loading.gif" alt="Loading..." />
    }else{
        if(!(applicationperiods.length>0)){
            applicationperiodss=<tr><td></td><td colSpan={2} ><span style={{ color:"red" }} >No data available</span></td></tr>
        }else{
            
            applicationperiodss=applicationperiods.map((period,idx)=>{
                return<><tr key={idx}>
                    <td>{period.id}</td>
                    <td>{period.year}</td>
                    <td>{period.month}</td>
                     <td><button className='btn btn-default' onClick={(e)=>updateisOpen(e,period.id)}>{period.open?'Open':'Closed'}</button></td>
                </tr></>


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
           <h1>Bursary applications</h1>
         </div>
         <div className="col-sm-6">
           <ol className="breadcrumb float-sm-right">
             <li className="breadcrumb-item"><a href="#">Home</a></li>
             <li className="breadcrumb-item active">Bursary applications</li>
           </ol>
         </div>
       </div>
     </div>
   </section>
   <section className="content">
                   <div className="container-fluid">
                     <div className="card card-default">
                    <div className="card-header">
                      
               
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
               <h3 className="card-title">All application periods </h3>
            
             </div>
             <div className="card-body" >
             <table id="example" className="table table-bordered table-hover">
                  <thead>
                  <tr >
                    <th>Id</th>
                    <th>Year</th>
                    <th>Month</th>
                    <th>is_open</th>
                  </tr>
                  </thead>
                  <tbody>
                      {applicationperiodss}
                  </tbody>
                  <tfoot>
                  <tr >
                    <th>Id</th>
                    <th>Year</th>
                    <th>Month</th>
                    <th>is_open</th>
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
     {
           dialog.isLoading && <ApplicationPeriodDialog 
                                  message={dialog.message}
                                  periodId={dialog.periodId}
                                onDialog={areYouSure}
                                // onDialog=[areYouSure]
                                // onDialog={thisClicked}
                                thisClicked={dialog.thisClicked} 
                                />
         }

    </Fragment>
  )
}
