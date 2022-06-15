import React,{useState,Fragment,useEffect} from 'react'
//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 
import  * as ROUTES from './../../../constants/Routes'
import { Link } from "react-router-dom";
import Select from 'react-select';

import { awardbursaryrequest, awardbursaryrequestasindividual, bursaryapplications, bursaryapplicationsbyapplicationyearandmonth, bursaryapplicationsforhigherlearning, fetchallapplicationperiodsyears, fetchallapplicationperiodyearmonths, fetchallhigherschools, fetchbursaryapplicationsbyschool, fetchbursaryapplicationsbyschoolcategory, fetchhigherbursaryapplicationsbyschool, fetchhigherlearningbursaryapplicationsbyschoolcategory, fetchhigherlearningcategories, fetchhigherlearningchools, fetchschoolcategories, fetchsecschools, higherlearningawardbursaryrequest, higherlearningawardbursaryrequestasindividual, higherlearningbursaryapplicationsbyapplicationyearandmonth, updatestudentisapprovedstatus } from '../../../constants/ApiUtils';

export default function ViewApplications() {
  
   
  const [masterchecked, setmasterchecked] = useState(false)
  const [SelectedList, setselectedList] = useState([])
  const [bursaryawardamount, setbursaryawardamount] = useState([])
    const [ischecked, setischecked] = useState(false)
    const [isapproved, setisapproved] = useState(null)
    const[viewbursaryapplications,setviewbursaryapplications]=useState([])
    const [error, seterror] = useState(null)
    const [loading, setloading] = useState(true)
    const [isapplicationperiodsloading, setisapplicationperiodsloading] = useState(true)
    const [applicationperiods, setapplicationperiods] = useState([])
    const [applicationperiodyear, setapplicationperiodyear] = useState({applicationperiodyear:''})
    const [isapplicationyearmonthsloading, setisapplicationyearmonthsloading] = useState(true)
    const [applicationperiodsyearmonths, setapplicationperiodsyearmonths] = useState([])
    const [isschoolcatloading, setisschoolcatloading] = useState(true)
    const [schoolcategories, setschoolcategories] = useState([])
    const [issecondaryschoolsloading, setissecondaryschoolsloading] = useState(true)
    const [secondaryschools, setsecondaryschools] = useState([])
    const [globalawardamount, setglobalawardamount] = useState({'globalamount':''})
    const [bursaryawardresponse, setbursaryawardresponse] = useState([])
    const [bursaryawardresponseerror, setbursaryawardresponseerror] = useState(null)
    useEffect(()=>{
        fetchbursaryapplications()
        fetchallapplicationperiodsyearss();
        fetchsecondaryschools();
        fetchschoolcategoriesall();

    },[isapproved])
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
      if(masterchecked){
        $(".soloawardamount").show()
      }else{
        $(".soloawardamount").hide();
      }
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
     // Event to get selected rows(Optional)
  


    const fetchbursaryapplications=async ()=>{
        try {
          const response = await bursaryapplicationsforhigherlearning()
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
      const fetchallapplicationperiodsyearss=async()=>{
        try {
          const resp = await fetchallapplicationperiodsyears();
          if (resp) {
              setapplicationperiods(resp)
              setisapplicationperiodsloading(false)
            
            console.log("logging openapplicationperiods", resp);
          }
        } catch (exception) {
         
          setisapplicationperiodsloading(false)
          console.log("logging error ", exception);
        }
  
      }
      const fetchschoolcategoriesall=async()=>{
        try {
          const resp = await fetchhigherlearningcategories();
          
          setschoolcategories(resp)
          setisschoolcatloading(false)
        } catch (error) {
          
          setisschoolcatloading(false)
          console.log("an error has occurred while fetching school categories ", error);
        }
      }
      const fetchsecondaryschools=async()=>{
        try {
           const response = await fetchallhigherschools();
           if (response) {
             
             setsecondaryschools(response)
             setissecondaryschoolsloading(false)
  
           }
           console.log("response", response);
         } catch (exception) {
           console.log("error ", exception);
           
           setissecondaryschoolsloading(false)
         }
      }
      const onapplicationperiodyearchange=(e)=>{
        e.preventDefault();
        // alert("on apppl "+e.target.value)
        setapplicationperiodsyearmonths([])
        setisapplicationyearmonthsloading(true);
       
        const data={
          year:e.target.value
        }


        fetchallapplicationperiodyearmonths(data).then(resp=>{
          if(resp){
            
            setapplicationperiodsyearmonths(resp)
            setisapplicationyearmonthsloading(false)
            console.log("applicationperiodyear this is the response ",resp)
          }
        }).catch(error=>{
          
          setisapplicationyearmonthsloading(false)
                console.log("error ",error);
        })
      }
      const fetcbursaryapplicationsbyapplicationyearandmonth=async (data)=>{

        try {
          const resp = await higherlearningbursaryapplicationsbyapplicationyearandmonth(data);
          if (resp) {
            setviewbursaryapplications(resp);
            setloading(false);
          }
        } catch (error) {
          seterror(error);
          setloading(false);
        }
      }

      
        const fetchapplicationssbyyearandmonth=(event)=>{
            event.preventDefault();
             setviewbursaryapplications([])
             setloading(true)
             if(event.target.value==="0"){
               fetchbursaryapplications()
               return
             }
             const data={
              month:event.target.value,
              year:applicationperiodyear?.applicationperiodyear
            }
            console.log("datatatata ",data)
            fetcbursaryapplicationsbyapplicationyearandmonth(data)

        }
        const fetchapplicationsbyschoolcategory=(event)=>{
             event.preventDefault();
             if(event.target.value==="0"){
               fetchbursaryapplications()
               return
             }
             setviewbursaryapplications([])
             setloading(true)
             const categoryid=event.currentTarget.value;
             const data={
                 categoryId:Number(categoryid)
             }
             fetchhigherlearningbursaryapplicationsbyschoolcategory(data.categoryId).then(resp=>{
               setviewbursaryapplications(resp)
               setloading(false)
          }).catch(error=>{
              setloading(false)
              seterror(error)
              fetchbursaryapplications()
              console.log("error",error)
          })
        }
        const fetchapplicationsbyschool=(selectedOption)=>{
            // event.preventDefault();
            if(selectedOption.value==="0"){
              fetchbursaryapplications()
              return
            }
            setviewbursaryapplications([])
            setloading(true)
            const data={
              schoolId:Number(selectedOption.value)
            }
            fetchhigherbursaryapplicationsbyschool(data.schoolId).then((response)=>{
              if(response){
                  setviewbursaryapplications(response)
                  setloading(false)  
      
              }
              console.log("logging bursary applications with response ",response);
      
            }).catch((error)=>{
              seterror(error)
              console.log("logging error ",error)
              setloading(false)
              fetchbursaryapplications()
            })


        }
        const handleInput=(e)=>{
            e.preventDefault();
            // alert(e.target.value)
            setapplicationperiodyear({...applicationperiodyear,[e.target.name]:e.target.value})
          }
          const handleamount=(e,applid)=>{
            e.preventDefault();
          
            // setbursaryawardamount({...bursaryawardamount,[e.target.name]:e.target.value})
            setbursaryawardamount({...bursaryawardamount,[applid]:e.target.value})

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
    

      const handleaward=(e)=>{
        e.preventDefault();
        const amounttoawardarray=Object.entries(bursaryawardamount);
        const bursaryamount={
          bursaryawardamount:bursaryawardamount
        }
   
        const awardbyindividualamount=[]
        
        

         viewbursaryapplications.content.filter((app,id)=>{
           amounttoawardarray.map((data,idx)=>{
             if (app.id===Number(data[0])) {
                  awardbyindividualamount.push(data[0]+":"+data[1])  
             }
           })
         })

 
         
         
           if(!awardbyindividualamount.length){
            if(globalawardamount.globalamount !==''){
              const selecteddata=viewbursaryapplications.content.filter((data,idx)=>data.selected)
               
                 const data={
                   awardrequest:selecteddata,
                   amount:Number(globalawardamount.globalamount)
                 }
                 console.log("aaward ddd ",data);
                 if(data.awardrequest.length==0 || data.amount===null || data.amount===''){
                        alert("one or more empty fields")
                        return false;
                 }else{
                   console.log("awarddatahigherlearning ",data)                  
                   higherlearningawardbursaryrequest(data).then((resp)=>{
                    if(resp){
                      console.log("resp",resp)
                      setbursaryawardresponse(resp)
                    }
        
                 }).catch((error)=>{
                   console.log("error",error);
                   setbursaryawardresponseerror(error)
                 })
                 }


            }else{
              alert("empty")
            }
         }else if(awardbyindividualamount.length > 0){          
            console.log("yererere ",awardbyindividualamount)
            
           const awardasindividual=Object.assign({},awardbyindividualamount)
           const list=JSON.stringify(awardbyindividualamount);
           console.log("list ",list)
           higherlearningawardbursaryrequestasindividual(list).then((resp)=>{
             if(resp){
               console.log("resp",resp)
               setbursaryawardresponse(resp)
              }

           }).catch((error)=>{
             console.log("error",error)
             setbursaryawardresponseerror(error)
           })


           
         }   
        


      }
    
      const handleglobalawarchange=(event)=>{
          event.preventDefault();
          setglobalawardamount({...globalawardamount,[event.target.name]:event.target.value})
      }
    


      let allapplicationperiodyear
      if(isapplicationperiodsloading){
         allapplicationperiodyear=<option>Please wait...</option>
      }else{
        if(!applicationperiods.length>0){
         allapplicationperiodyear=<option>No data available</option>
       }else{
          allapplicationperiodyear=applicationperiods?.map((openperiod,idx)=>{
            return <><option key={idx} value={openperiod}>{openperiod}</option></>
          })
          
        }
      }
      let allapplicationyearmonths
      if (isapplicationyearmonthsloading) {
        allapplicationyearmonths=<option>Please wait....</option>
      }else{
        if (!applicationperiodsyearmonths.length>0) {
         allapplicationyearmonths=<option>No data available</option>
        }else{
         allapplicationyearmonths=applicationperiodsyearmonths.map((month,idx)=>{
           return <><option key={idx} value={month.month}>{month.month}</option></>
         })
        }
        
      }




     let secschoolscategories;
     if(isschoolcatloading){
         secschoolscategories=<option>Loading....</option>
     }else{
         if (schoolcategories?.length>0) {
             secschoolscategories=schoolcategories?.map((category,idx)=>{
                 return<><option key={category.id} value={category.id}>{category.category}</option></>
             })
             
         }
     }
     let secschools;
     if(issecondaryschoolsloading){
     }else{
        if(secondaryschools?.content?.length>0){
           
            secschools=secondaryschools?.content?.map(function (school) {
              return { value: school.id, label: school.name+'--'+school?.higherEducationnCategory?.category};
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
          if(appl.isapproved){
          return < >   
          <tr key={idx} className={appl.isapproved ? "selected" : ""} style={{ backgroundColor:"white" }}>
          <td>{appl?.admissionnumber}</td>
          <td>{appl?.fullname}</td>
          <td>{appl?.idnumber}</td>
          <td>{appl?.phonenumber}</td>
          <td>{appl?.yearofadmission}</td>
          <td>{appl?.durationofcourse}</td>
          <td>{appl?.applicationyear}</td>
          <td>{appl?.applicationmonth}</td>
          <td>{appl?.higherEducationn?.name}</td>           
              <td>{appl.isapproved?
               <input type="text"      value={bursaryawardamount[appl.id]}  onChange={(e)=>handleamount(e,appl.id)} className="formControl soloawardamount" placeholder="amount to award" style={{width:"100%"}} />
              :
              ''}</td>
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
             <td><Link className="btn btn-default" to={`${ROUTES.SHOWBURSARYDETAILSPAGE}${appl.id}`}> Details</Link></td>
          </tr>  
          </>
        }
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
                <div className="col-md-10">{bursaryawardresponse?.message && <span className="help-block text-success card-title">{bursaryawardresponse?.message}</span> }</div>
                <div className="col-md-2">              </div>
              </div> 
              <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-10">{bursaryawardresponseerror && <span className="help-block text-danger card-title">{bursaryawardresponseerror?.message}</span> }</div>
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
                  <div className="row">
                  <div className="row">
                <div className="col-md-3">
                  <div className="form-group">
                  <label htmlFor="applicationYear" className="control-label"> appication year</label>
                  <select name="applicationperiodyear" id="" className='form-control' onChange={(e) => {handleInput(e); onapplicationperiodyearchange(e) }} value={applicationperiodyear?.applicationperiodyear} >
                  {/* <select name="secondarySchool" className= 'form-control' onChange={(event)=>fetchawardsbyschool(event)} width="auto" > */}
                      <option value="0">Select application year</option>
                      {allapplicationperiodyear}
                    </select>
                      <span className="help-block text-danger"></span>
                  </div>       
                </div> 

                <div className="col-md-3">
                  <div className="form-group">
                  <label htmlFor="applicationMonth" className="control-label"> appication month</label>
                  <select name="applicationMonth" className= 'form-control' onChange={(event)=>fetchapplicationssbyyearandmonth(event)} width="auto" >
                      <option value="0">Select application month</option>
                      {allapplicationyearmonths}
                    </select>
                      <span className="help-block text-danger"></span>
                  </div>       
                </div> 

                <div className="col-md-3">
                  <div className="form-group">
                  <label htmlFor="schoolcategory" className="control-label"> school category</label>
                  <select name="schoolcategory" className= 'form-control' onChange={(event)=>fetchapplicationsbyschoolcategory(event)} width="auto" >
                      <option value="0">Select school category</option>
                      {secschoolscategories}
                    </select>
                      <span className="help-block text-danger"></span>

                  </div>       
                </div> 

                <div className="col-md-3">
                  <div className="form-group">
                  <label htmlFor="schoolId" className="control-label"> schools</label>
                    <Select 
                        placeholder="Type to search"
                        name="secondarySchool"
                        options = {secschools}
                        onChange={fetchapplicationsbyschool}
                        autoFocus={true}
                    /> 
                      <span className="help-block text-danger"></span>

                  </div>       
                </div>                     
        </div>
                  </div>
                 
                </div>
                <div className="card-body" >
                  <table id="example" className=" table table-bordered table-hover table-striped" >                       <thead>
                    <tr >

                    <th>Admission_number</th>
                      <th>Name</th>                            
                      <th>Id_number</th>
                      <th>Phone</th>
                      <th>Admissionyear</th>
                      <th>Courseduration</th>
                      <th>Year</th>
                      <th>Month</th>
                      <th>School</th>
                      <th>Amount</th>
                      <th>    
                      <input
                  type="checkbox"
                  className="form-check-input"
                  checked={masterchecked}
                  id="mastercheck"
                  onChange={(e) => onMasterCheck(e)}
                  style={{width:"20px",height:"20px" }}
                />
                <input type="text" name="globalamount"  value={globalawardamount.globalamount} onChange={handleglobalawarchange}   style={{marginLeft:"3px", width:"70px" }}/>
                  <button className='btn btn-primary ' onClick={(e)=>handleaward(e)} style={{ marginTop:'10px',width:"100px" }}   id="btnRows">Award</button>

                </th>

                      <th>Details</th>
                    </tr>
                    </thead>
                    <tbody>
                 {viewalapplications}
                 </tbody>
                    <tfoot>
                    <tr >
                    <th>Admission_number</th>
                      <th>Name</th>                            
                      <th>Id_number</th>
                      <th>Phone</th>
                      <th>Admissionyear</th>
                      <th>Courseduration</th>
                      <th>Year</th>
                      <th>Month</th>
                      <th>School</th>
                      <th>Amount</th>
                      <th>    
                      <button className='btn btn-primary ' onClick={(e)=>handleaward(e)} style={{ marginTop:'10px',width:"100px" }}   id="btnRows">Award</button>

                </th>
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
