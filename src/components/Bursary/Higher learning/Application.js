import React,{Fragment,useEffect,useState} from 'react'
import * as ROUTES from '../../../constants/Routes'
import { Link } from 'react-router-dom'
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"

import $ from 'jquery'; 
import Select from 'react-select';
import { doeshigherlearningstudentexistswithadmnoandschool, fetchallhigherschools, higherlearningapplybursary, openapplicationperiod } from '../../../constants/ApiUtils'

export default function Application() {
  const [serverresponse, setserverresponse] = useState()
  const [error, seterror] = useState()
  const [bursaryinput, setbursaryinput] = useState({
    'applicationperiodyear':'',
    'applicationperiodmonth':'',
    'admissionnumber':'',
    'school':'',
    'fullname':'',
    'idnumber':'',
    'phonenumber':'',
    'voterscard':'',
    'yearofadmission':'',
    'durationofcourse':''
  })

  const [openapplicationperiods, setopenapplicationperiods] = useState({})
  const [isopenapplicationperiodsfetchloading, setisopenapplicationperiodsfetchloading] = useState(true)
   const [schools, setschools] = useState([])
   const [schoolloading, setschoolloading] = useState(true)
   const [higherlearningerror, sethigherlearningerror] = useState()
   useEffect(() => {
     fetchapplicationperiods();
     fetchhigherschools();

    }, [])
    const fetchapplicationperiods=async ()=>{
   try {
        const resp = await openapplicationperiod()
        if (resp) {
          setopenapplicationperiods(resp)
          setisopenapplicationperiodsfetchloading(false)
          console.log("logging openapplicationperiods", resp)
        }
      } catch (exception) {
        setisopenapplicationperiodsfetchloading(false)
        console.log("logging error ", exception)
      }
    }
    const fetchhigherschools=async ()=>{
      try {
        const resp = await fetchallhigherschools();
        if (resp) {
          console.log("theresponsee ",resp)
          setschools(resp);
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

  const handleInput=(event)=>{
    event.preventDefault();
    setbursaryinput({...bursaryinput,[event.target.name]:event.target.value})

  }
  
  const handlesubmit=(e)=>{
    e.preventDefault()
    const data={
      applicationperiodyear:openapplicationperiods?.year,
      applicationperiodmonth:openapplicationperiods?.month,
      // applicationperiodyear:op.applicationperiodyear,
      // applicationperiodmonth:bursaryinput.applicationperiodmonth,
      admissionnumber:bursaryinput.admissionnumber,
      school:bursaryinput.school,
      fullname:bursaryinput.fullname,
      idnumber:bursaryinput.idnumber,
      phonenumber:bursaryinput.phonenumber,
      voterscard:bursaryinput.voterscard,
      yearofadmission:bursaryinput.yearofadmission,
      durationofcourse:bursaryinput.durationofcourse,
    }
    console.log("logging data ",data);
    higherlearningapplybursary(data).then((resp)=>{
      if(resp){
        console.log("Responsesse ",resp);
        setserverresponse(resp)
        
      }
    }).catch((error)=>{
      console.log("Error ",error)
      seterror(error)
    })
  }
  const handleInputschool=(selectedOption)=>{
    const data=mydata()
     console.log("selected Option ",selectedOption);
    let schoolId=selectedOption.value;
    let schoolname=selectedOption.label;
    let admno=bursaryinput.admissionnumber;
     
    setbursaryinput({
      applicationperiodyear:data.applicationperiodyear !==''?data.applicationperiodyear:'',
      applicationperiodmonth:data.applicationperiodmonth !==''?data.applicationperiodmonth:'',
      admissionnumber:data.admissionnumber !==''?data.admissionnumber:'',
      school:schoolId,
      fullname:data.fullname !==''?data.fullname:'',
      idnumber:data.idnumber !==''?data.idnumber:'',
      phonenumber:data.phonenumber !==''?data.phonenumber:'',
      voterscard:data.voterscard !==''?data.voterscard:'',
      yearofadmission:data.yearofadmission !==''?data.yearofadmission:'',
     durationofcourse:data.durationofcourse !==''?data.durationofcourse:'',
    })

    if ((admno ===''|| admno===undefined|| admno===null) && (schoolId !=='' || schoolId !=='0' || schoolId !==0 || schoolId !==undefined || schoolId !==null)) {
    console.log("stuck in the first tier")
    }else if(admno ===''|| admno===undefined|| admno===null && schoolId==='' || schoolId==='0'|| schoolId===0|| schoolId===null|| schoolId===undefined){
      console.log("stuck in the seconda tier")
    }else if(admno ===''|| admno===undefined|| admno===null){
      console.log("stuck in the third tier")
    }else if(schoolId==='' || schoolId==='0'|| schoolId===0|| schoolId===null|| schoolId===undefined){
      console.log("stuck in the fourth tier")
    }else{
       
      const dataa={
        schoolId:Number(schoolId),
        studentAdmno:admno
       }
       console.log(dataa)
  
      checkifthehigherearningstudentexistswithadmandschool(dataa) 
    }



  }
  const checkifthehigherearningstudentexistswithadmandschool=async (dataa)=>{
    const data=mydata()
       try {
      const resp = await doeshigherlearningstudentexistswithadmnoandschool(dataa);
      if (resp?.flag) {
        console.log("Response Fag ",resp?.flag)
        setbursaryinput({
          applicationperiodyear:data.applicationperiodyear !==''?data.applicationperiodyear:'',
          applicationperiodmonth:data.applicationperiodmonth !==''?data.applicationperiodmonth:'',
          admissionnumber:data.admissionnumber !==''?data.admissionnumber:'',
          school:data.school,
          fullname:resp.fullname,
          idnumber:resp.idnumber,
          phonenumber:resp.phonenumber,
          voterscard:resp.voterscard,
          yearofadmission:resp.yearofadmission,
         durationofcourse:resp.durationofcourse,
        })
      } else {
        console.log("Resp ",resp)
        setbursaryinput({
          applicationperiodyear:data.applicationperiodyear !==''?data.applicationperiodyear:'',
          applicationperiodmonth:data.applicationperiodmonth !==''?data.applicationperiodmonth:'',
          admissionnumber:data.admissionnumber !==''?data.admissionnumber:'',
          school:data.school,
          fullname:'',
          idnumber:'',
          phonenumber:'',
          voterscard:'',
          yearofadmission:'',
         durationofcourse:'',
        })
       
      }
      console.log("lennnts ", bursaryinput.fullname);
    } catch (error) {
      console.log("error", error);
    }
     }

  const mydata=()=>{
    return {
      applicationperiodyear:bursaryinput.applicationperiodyear,
    applicationperiodmonth:bursaryinput.applicationperiodmonth,
    admissionnumber:bursaryinput.admissionnumber,
    school:bursaryinput.school,
    fullname:bursaryinput.fullname,
    idnumber:bursaryinput.idnumber,
    phonenumber:bursaryinput.phonenumber,
    voterscard:bursaryinput.voterscard,
    yearofadmission:bursaryinput.yearofadmission,
    durationofcourse:bursaryinput.durationofcourse
    }
  }
  const checkifthestudentexists=(e)=>{
    e.preventDefault();
  }
  let higherschools;
  if (schoolloading) {
  }else{
    if(schools?.content.length>0){
     higherschools=schools?.content?.map(function (school) {
       return { value: school.id, label: school.name+'--'+school?.higherEducationnCategory?.category};
      //  return { value: school.id, label: school.name};
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
                 <h1>Catalogues</h1>
               </div>
               <div className="col-sm-6">
                 <ol className="breadcrumb float-sm-right">
                   <li className="breadcrumb-item"><Link to={ROUTES.MAINWITHFORWARDSLASH}>Home</Link></li>
                   <li className="breadcrumb-item active">Apply for a bursary</li>
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
         <div className="col-md-10">{serverresponse && <span className="help-block text-danger card-title">{serverresponse?.message}</span>}</div>
         <div className="col-md-2">

         </div>
       </div> 
               </div>
               </div>
               </div>
               </section>           
         <form  onSubmit={handlesubmit} role="form"  encType="multipart/form-data">
       <section className="content">
           <div className="container-fluid">
             <div className="card card-default">
               <div className="card-header">
                <p> <h3 className="card-title">College/Universities</h3></p>     
               </div>
                 <div className="card-body">
                
                   <div className="row">
                       <p>Application period</p>
                       <div className="col-md-6">
                       <div className="form-group">
                       <label htmlFor="applicationperiodyear" className="control-label">Year</label>
                         <select   name="applicationperiodyear" id="checkboxselect" className='form-control' onChange={(e) => { handleInput(e) }} value={bursaryinput?.applicationperiodyear} >
                         <option value={openapplicationperiods?.year} >{openapplicationperiods?.year}</option>
                       </select>
                       </div>
                       </div> 
                       
                     
                 <div className="col-md-6">
                         <div className="form-group">
                           <label htmlFor="applicationperiodmonth">Select Month</label>
                           <select name="applicationperiodmonth" id="" onChange={handleInput} value={bursaryinput?.applicationperiodmonth} className='form-control '>
                           <option value={openapplicationperiods?.month} selected>{openapplicationperiods?.month}</option>
                           </select>
                         </div>
                       </div>      
                       <div className="col-md-6">
                       <div className="form-group">
                       <label htmlFor="admissionnumber" className="control-label">Admission number</label>
                         <input type="text" name="admissionnumber"  onChange={handleInput} value={bursaryinput?.admissionnumber} className={(error?.admissionnumber)? 'form-control is-invalid':'form-control'}  placeholder="your admission number" />
                         <span className="help-block text-danger">{error?.admissionnumber}</span>
                       </div>       
                     </div>
                  
                     <div className="col-md-6">
                       <div className="form-group">
                       <label htmlFor="secondarySchool" className="control-label">Select school</label>
                         <Select 
                       placeholder="Type to search"
                       name="secondarySchool"
                       options = {higherschools}
                       onChange={handleInputschool}
                       autoFocus={true}
                   /> 



                       </div>       
                     </div>
                     <div className="col-md-6">
                       <div className="form-group">
                       <label htmlFor="fullname" className="control-label">Your full name</label>
                         <input type="text" name="fullname" onChange={handleInput} value={bursaryinput?.fullname} className={(error?.fullname)? 'form-control is-invalid':'form-control'}   placeholder="your full name" />
                         <span className="help-block text-danger">{error?.fullname}</span>
                       </div>       
                     </div> 
                     
                    
                   
                     <div className="col-md-6">
                       <div className="form-group">
                       <label htmlFor="idnumber" className="control-label">Your id number</label>
                            <input type="text" name="idnumber"  onChange={handleInput} onPointerLeave={(e)=>checkifthestudentexists(e)}   value={bursaryinput?.idnumber} className={(error?.idnumber)? 'form-control is-invalid':'form-control'}  placeholder="Your  id number" />
                         <span className="help-block text-danger">{error?.idnumber}</span>
                       </div>       
                     </div>
                     
                     <div className="col-md-6">
                       <div className="form-group">
                       <label htmlFor="phonenumber" className="control-label">Your phone contact</label>
                         <input type="text" name="phonenumber" onChange={handleInput} value={bursaryinput?.phonenumber} id="phonenumberid" className={(error?.phonenumber)? 'form-control is-invalid':'form-control'}  placeholder=" phone contact"  />         
                         <span className="help-block text-danger">{error?.phonenumber}</span>
                       </div>       
                     </div>
                     <div className="col-md-6">
                       <div className="form-group">
                       <label htmlFor="voterscard" className="control-label">Your voter's Card (Optional)</label>
                         <input type="text" name="voterscard" onChange={handleInput} value={bursaryinput?.voterscard} id="voterscardid" className={(error?.voterscard)? 'form-control is-invalid':'form-control'}  placeholder="Voter's card"  />         
                         <span className="help-block text-danger">{error?.voterscard}</span>
                       </div>       
                     </div>

                    
                     <div className="col-md-6">
                       <div className="form-group">
                       <label htmlFor="yearofadmission" className="control-label">Year Of Admission (Numeric)</label>
                         <input type="text" name="yearofadmission" onChange={handleInput} value={bursaryinput?.yearofadmission} id="yearofadmissionid" className={(error?.yearofadmission)? 'form-control is-invalid':'form-control'}  placeholder="year of admission"  />         
                         <span className="help-block text-danger">{error?.yearofadmission}</span>
                       </div>       
                     </div>
                     <div className="col-md-6">
                       <div className="form-group">
                       <label htmlFor="durationofcourse" className="control-label">Duration Of Course</label>
                         <input type="text" name="durationofcourse" onChange={handleInput} value={bursaryinput?.durationofcourse} id="durationofcourseid" className={(error?.durationofcourse)? 'form-control is-invalid':'form-control'}  placeholder="Duration Of Course"  />         
                         <span className="help-block text-danger">{error?.durationofcourse}</span>
                       </div>       
                     </div>


                    
                
                   </div>
                 </div>
                 <div className="card-footer">
                   <button  type="submit" className="btn btn-primary">Save</button>
                 </div>
                


             </div>
         
           </div>
         </section>
  
     </form>
  
    </div>
   </Fragment>
  )
}
