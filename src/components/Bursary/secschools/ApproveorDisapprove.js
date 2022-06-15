import React,{useState,useEffect,Fragment} from 'react'
//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 
import { approvedisapprovearray, getbursaryapplicationstoupate, updatestudentisapprovedstatus } from '../../../constants/ApiUtils';
export default function ApproveorDisapprove() {
    const[viewbursaryapplications,setviewbursaryapplications]=useState([])
    const [loading, setloading] = useState(true)
    const [isapproved, setisapproved] = useState(null)
    const [error, seterror] = useState(null)
    const [masterchecked, setmasterchecked] = useState(false)
    const [SelectedList, setselectedList] = useState([])
    const [bursaryupdatestatusresponse, setbursaryupdatestatusresponse] = useState([])
    const [bursaryupdatestatusresponseerror, setbursaryupdatestatusresponseerror] = useState(null)
    useEffect(()=>{
        fetchbursaryapplications()

    },[isapproved])
    const fetchbursaryapplications=async ()=>{
        try {
          const response = await getbursaryapplicationstoupate()
          if (response) {
            setviewbursaryapplications(response)
            setloading(false)
            $(document).ready(function () {
              $('#example').DataTable()
            })
    
          }

        } catch (error) {
          setloading(false)
          seterror(error)
        }
      }
      const handleapproveordissapprove=(event,isapproved,applid)=>{
        event.preventDefault();
        setisapproved(null)
        const thisclicked=event.currentTarget;
        const thisclickedid=thisclicked.id
        const data={
          applicationId:Number(event.currentTarget.id)
        }
        console.log(event.currentTarget.innerText)
        updatestudentisapprovedstatus(data).then((resp)=>{
      
                  if(resp){

                    setisapproved({'applid':true+","+thisclickedid})
                    setisapproved({thisclickedid:true+thisclickedid})
                  }else if(!resp){
                    setisapproved({'applid':false+","+thisclickedid})
                    setisapproved({thisclickedid:false+thisclickedid})
                  
                  }
        }).catch((error)=>{
          console.log("error while trying to update application status ",error)
        })
          
      }
       //onItemCheck
    const onItemCheck=(e,item)=>{
        let bu=viewbursaryapplications;
        console.log("item ",item)
        bu?.content?.map((appl)=>{
          if (appl.id===item.id) {
            appl.selected=e.target.checked
            
          }
         console.log("hsjhfjgjgjj ",appl)
          return appl
        });
            //To Control Master Checkbox State
            const totalItems =viewbursaryapplications?.content?.length;
            const totalCheckedItems=bu?.content?.filter((e)=>e.selected).length
            console.log("totalItems",totalItems)
            console.log("totalCheckedItems",totalCheckedItems)
            // return
            //update state
            setmasterchecked(totalItems===totalCheckedItems)
            setviewbursaryapplications(bu)
            setselectedList(viewbursaryapplications?.content?.filter((e)=>e.selected))
      }
      const onMasterCheck=(e)=>{
        e.preventDefault();
         
        let bu=viewbursaryapplications;
        console.log("bu ",viewbursaryapplications);
        // return
      bu?.content?.map((appl)=>appl.selected=e.target.checked)
        //update state
        setmasterchecked(e.target.checked)
        setviewbursaryapplications(bu)
        setselectedList(viewbursaryapplications?.content?.filter((e)=>e.selected))
         console.log("masterchecked",masterchecked)
        // if(masterchecked){
        //   $(".soloawardamount").show()
        // }else{
        //   $(".soloawardamount").hide();
        // }
      }
  
 const handleglobalapprove=(e)=>{
     e.preventDefault()
     console.log("theselectedlist",SelectedList)
     setisapproved(null)

     const ids=[];
     SelectedList.filter((data)=>{
         ids.push(Number(data.id))
     })
     if(!ids.length>0){
         console.log("empty")
         return false;
     }else{
         console.log("The ids ",ids)
         approvedisapprovearray(ids).then((resp)=>{
                  if(resp){
                      setbursaryupdatestatusresponse(resp)
                      setisapproved("yes")

                  }
         }).catch((error)=>{
             setbursaryupdatestatusresponseerror(error)
         })
     }
     
 }

    let viewalapplications;
    if (loading) {
      viewbursaryapplications?.content?.forEach((appl)=>
      {
        appl.selected=false
    })
     viewalapplications=<img src="/images/misc/loading.gif" alt="Loading..." />

   }else if(!viewbursaryapplications?.content?.length>0){
    viewalapplications=<tr>
    <td ></td>
   
      <td colSpan={2} ><span style={{ color:"red" }} >No data available</span></td>
    </tr>
   }else{

      viewalapplications=viewbursaryapplications?.content?.map(function(appl,idx){
        return < >   
        <tr key={idx} className={appl.isapproved ? "selected" : ""} style={{ backgroundColor:"white" }}>
          <td>{appl?.admissionnumber}</td>
          <td>{appl?.fullname}</td>
          <td>{appl?.formorclas}</td>
          <td>{appl?.applicationyear}</td>
          <td>{appl?.applicationmonth}</td>
          <td>{appl?.secondaryschool?.school.slice(0,10)}--{appl?.secondaryschool?.code}</td>
          <td>{appl?.studentparent?.phonenumber}</td>
          <td>{appl?.studentparent?.ward?.subcounty?.county?.county}--{appl?.studentparent?.ward?.subcounty?.county?.code}</td>
          <td>{appl?.studentparent?.ward?.ward}</td>           
           <td><button id={appl.id} onClick={(event)=>handleapproveordissapprove(event,appl.isapproved,appl.id)}>{appl.isapproved?'Disapprove':'Approve'}</button></td>
                  
          <td><center>
          <div>
                     <input
                       type="checkbox"
                       checked={appl.selected}
                       className="form-check-input"
                       style={{width:"20px",height:"20px" }}
                       id={"rowcheck"+appl.id}
                       onChange={(e) =>onItemCheck(e, appl)}
                     />
            </div></center></td>
        </tr>  
        </>
      })
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
                     
                <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-10">{bursaryupdatestatusresponse?.message && <span className="help-block text-success card-title">{bursaryupdatestatusresponse?.message}</span> }</div>
                <div className="col-md-2">              </div>
              </div> 
              <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-10">{bursaryupdatestatusresponseerror && <span className="help-block text-danger card-title">{bursaryupdatestatusresponseerror?.message}</span> }</div>
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
                  
                 
                </div>
                <div className="card-body" >
                  <table id="example" className="table table-striped table-hover">    
                                     <thead>
                    <tr >
                      <th>Adm_no</th>
                      <th>Name</th>                            
                      <th>Form</th>
                      <th>Year</th>
                      <th>Month</th>
                      <th>School</th>
                      <th>Phone</th>
                      <th>County</th>
                      <th>ward</th>
                      <th>Is_Approved</th>
                      
                      <th>check  
                      <input
                  type="checkbox"
                  className="form-check-input"
                  checked={masterchecked}
                  id="mastercheck"
                  onChange={(e) => onMasterCheck(e)}
                  style={{width:"20px",height:"20px",marginLeft:"2px",marginRight:"2px" }}
                />    
                 <button className='btn btn-primary ' onClick={(e)=>handleglobalapprove(e)} style={{ marginTop:'10px',width:"100px" }}   id="btnRows">update</button>
         

                </th>
                

                      
                    </tr>
                    </thead>
                    <tbody>
                 {viewalapplications}
                 </tbody>
                    <tfoot>
                    <tr >
                      <th>Adm_no</th>
                      <th>Name</th>
                      <th>Form</th>
                      <th>Year</th>
                      <th>Month</th>
                      <th>School</th>
                      <th>Phone</th>
                      <th>County</th>
                      <th>ward</th>
                      <th>Is Approved</th>
                      
                      <th>check  
                      <input
                  type="checkbox"
                  className="form-check-input"
                  checked={masterchecked}
                  id="mastercheck"
                  onChange={(e) => onMasterCheck(e)}
                  style={{width:"20px",height:"20px",marginLeft:"2px",marginRight:"2px" }}
                />      
             <button className='btn btn-primary ' onClick={(e)=>handleglobalapprove(e)} style={{ marginTop:'10px',width:"100px" }}   id="btnRows">update</button>
       

                </th>
                      
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
