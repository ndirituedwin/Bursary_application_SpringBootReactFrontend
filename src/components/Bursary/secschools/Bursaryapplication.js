
import React, { Component, Fragment,useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import { fetchsecschools,applybursary, findbyparentphonenumberonkeyup, fetchcounties,fetchcountysubcounties, fetchsubcountywards, fetchallopenapplicationperiods, fetchappliationperiodyearmonths, findbyparentidnumberonchange, doesstudentexistswithadmnoandschool, openapplicationperiod } from '../../../constants/ApiUtils';
import LoadingIndicator from '../../../constants/LoadingIndicator';
import * as ROUTES from '../../../constants/Routes'
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"

import $ from 'jquery'; 
import Dialog from '../../Dialog/Dialog';
import Select from 'react-select';

export default function Bursaryapplication(props) {

      console.log("logging props inside Bursary application page ",props)
      const [dialog, setDialog] = useState({message:"",isLoading:false,parentidnumber:""})
      const [secschools, setsecschools] = useState(null)
      const [counties, setcounties] = useState([])
      const [countysubcounties, setcountysubcounties] = useState([])
      const [subcountywards, setsubcountywards] = useState([])
      const [openapplicationperiods, setopenapplicationperiods] = useState({})
      const [openapplicationperiodsyearmonths, setopenapplicationperiodsyearmonths] = useState([])
      const [isloading, setisloading] = useState(true)
      const [iscountyfetchloading, setiscountyfetchloading] = useState(true)
      const [issubcountyfetchloading, setissubcountyfetchloading] = useState(true)
      const [iswardfetchloading, setiswardfetchloading] = useState(true)
      const [isopenapplicationperiodsfetchloading, setisopenapplicationperiodsfetchloading] = useState(true)
      const [isopenapplicationyearmonthsloading, setisopenapplicationyearmonthsloading] = useState(true)
      const [error, seterror] = useState([])
      const [serverresponse, setserverresponse] = useState([])
      const [formsorclasses, setformsorclasses] = useState([])
      const [bursaryinput, setbursaryinput] = useState({
        'secondarySchool':'',
        'parentidnumber':'',
        'parentphonenumber':'',
        'parent_full_name':'',
        'admissionnumber': '',
        'fullname': '',
        'formorclass':'',
        'county':'',
        'sub_county':'',
        'ward':'',
        'applicationperiodyear':'',
        'applicationperiodmonth':'',
      });



      useEffect(() => {
        //fetch open application periods
        openapplicationperiod().then(resp=>{
          if(resp){
            setopenapplicationperiods(resp)
            setisopenapplicationperiodsfetchloading(false)
            console.log("logging openapplicationperiods",resp);
          }  
        }).catch(exception=>{
          setisopenapplicationperiodsfetchloading(false)
          console.log("logging error ",exception);
        })
        let forms=[];
        forms.push('form one','form two','form three','form four','form five','form six');
        setformsorclasses(forms);
        fetchsecschools().then((response)=>{
           if(response){
             setsecschools(response)

             setisloading(false)
           }
           console.log("about to show the schools ",response.content)
         }).catch((error)=>{
           seterror(error?.message)
           setisloading(false)
           console.log("about to log error from the server ",error)

         })
         //fetching counties
         fetchcounties().then((resp)=>{
           if(resp){
             setcounties(resp)
             setiscountyfetchloading(false)
            //  $("#checkboxselect").chosen();

           }
         }).catch((error)=>{
           setiscountyfetchloading(false)
           console.log("error ",error)
         })

      }, [props.isAuthenticated])

    

  const handleInput=(event)=>{
    event.preventDefault();
    setbursaryinput({...bursaryinput,[event.target.name]:event.target.value})
  }
  const mydata=()=>{
  return {
      applicationperiodyear:bursaryinput.applicationperiodyear,
      applicationperiodmonth:bursaryinput.applicationperiodmonth,
      ward:bursaryinput.ward,
      secondarySchool:bursaryinput.secondarySchool,
      parentidnumber:bursaryinput.parentidnumber,
      parentfullname:bursaryinput.parent_full_name ,
      parentphonenumber:bursaryinput.parentphonenumber ,
      admissionnumber:bursaryinput.admissionnumber ,
      fullname:bursaryinput.fullname ,
      formorclass:bursaryinput.formorclass,
      county:bursaryinput.county,
      subcounty:bursaryinput.sub_county
    }
  }
  const handleInputsecschool=(selectedOption)=>{
      const data=mydata();
      let admno=bursaryinput.admissionnumber
      let sel=selectedOption.value
        console.log("mydata ",data)
      setbursaryinput({
        secondarySchool:sel,
        county:data.county!==''?data.county:'',
        parentidnumber:data.parentidnumber!==''?data.parentidnumber:'',
        parentphonenumber:data.parentphonenumber!==''?data.parentphonenumber:'',
        parent_full_name:data.parentfullname!==''?data.parentfullname:'',
        admissionnumber:data.admissionnumber!==''?data.admissionnumber:'',
        fullname:data.fullname!==''?data.fullname:'',
        formorclass:data.formorclass!==''?data.formorclass:'',
        sub_county:data.subcounty!==''?data.subcounty:'',
        ward:data.ward!==''?data.ward:'',
        applicationperiodyear:openapplicationperiods?.year,
        applicationperiodmonth:openapplicationperiods?.month,
  
      })
      
     
      if(admno===''|| admno===undefined||admno===null){
       
        
      } else  if(sel===0||sel===undefined|| sel===''||sel===null|| sel==='0') {
       
     }  else{
     
      const dataa={
        schoolId:Number(selectedOption.value),
        studentAdmno:admno
       }
  
      checkifthestudentexistswithadmandschool(dataa) 
     }     

    
     


   
  }
  const handleInputcounty=(selectedOption)=>{
     const data=mydata()
    setbursaryinput({
      county:selectedOption.value,
      secondarySchool:data.secondarySchool!==''?data.secondarySchool:'',
      parentidnumber:data.parentidnumber!==''?data.parentidnumber:'',
      parentphonenumber:data.parentphonenumber!==''?data.parentphonenumber:'',
      parent_full_name:data.parentfullname!==''?data.parentfullname:'',
      admissionnumber:data.admissionnumber!==''?data.admissionnumber:'',
      fullname:data.fullname!==''?data.fullname:'',
      formorclass:data.formorclass!==''?data.formorclass:'',
      sub_county:data.subcounty!==''?data.subcounty:'',
      ward:data.ward!==''?data.ward:'',
      applicationperiodyear:openapplicationperiods?.year,
      applicationperiodmonth:openapplicationperiods?.month,

    })
    selectsubcountiesbasedofcounty(selectedOption.value)
    
  }
  const handleInputsubcounty=(selectedOption)=>{
     const data= mydata();
    setbursaryinput({
      sub_county:selectedOption.value,
      county:data.county!==''?data.county:'',
      secondarySchool:data.secondarySchool!==''?data.secondarySchool:'',
      parentidnumber:data.parentidnumber!==''?data.parentidnumber:'',
      parentphonenumber:data.parentphonenumber!==''?data.parentphonenumber:'',
      parent_full_name:data.parentfullname!==''?data.parentfullname:'',
      admissionnumber:data.admissionnumber!==''?data.admissionnumber:'',
      fullname:data.fullname!==''?data.fullname:'',
      formorclass:data.formorclass!==''?data.formorclass:'',
      ward:data.ward!==''?data.ward:'',
      applicationperiodyear:openapplicationperiods?.year,
      applicationperiodmonth:openapplicationperiods?.month, 
    })

    
    fetchsubcountyywards(selectedOption.value)
  }
  const handleInputward=(selectedOption)=>{
    const data=mydata()
    setbursaryinput({
      ward:selectedOption.value,
      sub_county:data.subcounty!==''?data.subcounty:'',
      county:data.county!==''?data.county:'',
      secondarySchool:data.secondarySchool!==''?data.secondarySchool:'',
      parentidnumber:data.parentidnumber!==''?data.parentidnumber:'',
      parentphonenumber:data.parentphonenumber!==''?data.parentphonenumber:'',
      parent_full_name:data.parentfullname!==''?data.parentfullname:'',
      admissionnumber:data.admissionnumber!==''?data.admissionnumber:'',
      fullname:data.fullname!==''?data.fullname:'',
      formorclass:data.formorclass!==''?data.formorclass:'',
      applicationperiodyear:openapplicationperiods?.year,
      applicationperiodmonth:openapplicationperiods?.month,
    })
  }

 
  




  const handleparentidnumberchange=(event)=>{
     event.preventDefault();
     const data={
      // idnumber:Number(bursaryinput.parentidnumber)
      idnumber:Number(event.target.value)
     } 
     console.log("bursaryinput.parentidnumber",data.idnumber);
      
      if (data.idnumber==0 ) {
        $("#parentphonenumberid").val('');
        $("#parent_full_nameid").val('');
  
        
      }else{
        
        findbyparentidnumberonchange(data).then((resp)=>{
          console.log("response from server ",resp)
       
          if (!resp?.idnumber) {
            $("#parentphonenumberid").val('');
            $("#parent_full_nameid").val('');
          }else{
              
              $("#parentphonenumberid").val(resp?.phonenumber);
              $("#parent_full_nameid").val(resp?.name);

            setbursaryinput({
              secondarySchool:bursaryinput?.secondarySchool,
              parentidnumber:bursaryinput?.parentidnumber,
              parentphonenumber:resp?.phonenumber,
              parent_full_name:resp?.name,
              admissionnumber: bursaryinput?.admissionnumber,
              fullname:bursaryinput?.fullname,
              formorclass:bursaryinput?.formorclass,
              county:bursaryinput?.county,
              sub_county:bursaryinput?.sub_county,
              ward:bursaryinput?.ward,
              applicationperiodyear:bursaryinput?.applicationperiodyear,
              applicationperiodmonth:bursaryinput?.applicationperiodmonth,
              })
            
          }
      }).catch((exception)=>{
        console.log(exception);
      });
      }
  
  }

    //fetchcountysubcounties
    const  selectsubcountiesbasedofcounty=(selectedOption)=>{
      // event.preventDefault();
      // console.log(event.target.value);
      
           setcountysubcounties([])
       const data={
         code:Number(selectedOption)
       }
      
       fetchcountysubcounties(data).then((resp)=>{
         
           setcountysubcounties(resp)
           setissubcountyfetchloading(false)
           console.log("the county subcounties response ",resp)
            }).catch((error)=>{
         console.log("error ",error)
       })
    }
    //fetchsubcountywards
    const fetchsubcountyywards=(selectedOption)=>{
      // event.preventDefault();
      // setbursaryinput({...bursaryinput.sub_county,[event.target.name]:event.target.value})

      // setbursaryinput({...bursaryinput,[event.target.name]:event.target.value})
      setsubcountywards([])
      const data={
        id:Number(selectedOption)
      }
       
      fetchsubcountywards(data).then(resp=>{
        if(resp){
          setsubcountywards(resp)
          setiswardfetchloading(false);

        }
        console.log("the subcounty wards response ",resp)
      }).catch(error=>{
        console.log("error",error)
        setiswardfetchloading(false)
      })
    }

    const emptyfields=()=>{
         
      return setbursaryinput({
          'secondarySchool':'',
          'parentidnumber':'',
          'parentphonenumber':'',
          'parent_full_name':'',
          'admissionnumber':'',
          'fullname':'',
          'formorclass':'',
          'county':'',
          'sub_county':'',
          'ward':'',
          'applicationperiodyear':'',
          'applicationperiodmonth':'',
          })
    }
    const handleDialog=(message,isLoading,parentidnumber)=>{
      setDialog({
        message,isLoading,parentidnumber
      })
    }
    const areYouSure=(choose)=>{
       console.log("areYouSure choose logging ",choose)
       console.log("logging application bursary when the idnumber exists   ",bursaryinput)

      if (choose) {
        // go ahead and use existing parent
        
        handleDialog("", false);
        // alert("you choose to not cancel "+choose)
        const bursarypayload={
          applicationperiodyear:bursaryinput.applicationperiodyear,
          applicationperiodmonth:bursaryinput.applicationperiodmonth,
          parentward:Number(bursaryinput.ward),
          secondarySchool:parseInt(bursaryinput.secondarySchool),
          parentidnumber:parseInt(bursaryinput.parentidnumber),
          parentfullname:bursaryinput.parent_full_name ,
          parentphonenumber:bursaryinput.parentphonenumber ,
          admissionnumber:bursaryinput.admissionnumber ,
          fullname:bursaryinput.fullname ,
          formorclass:bursaryinput.formorclass,
          county:bursaryinput.county,
          subcounty:bursaryinput.sub_county

          // formorclass:parseInt(bursaryinput.formorclass.split('-')[0]),
        }
        console.log("logging application bursary data  ",bursarypayload)
        
         applybursary(bursarypayload).then((response)=>{
           console.log("logging response from server ",response)
           if(response){
            setserverresponse(response?.message)
            seterror([])
            if(response?.issuccess){
              emptyfields()
            }
           }
         }).catch((error)=>{
           seterror(error)
           console.log("logging server errors ",error)
         });

      } else {
        handleDialog("", false);
        // alert("you chose to cancel "+choose)
      }
    }
    const checkiftheparentexistsbygivenidnumber=async ()=>{
      try {
        const resp = await findbyparentidnumberonchange(bursaryinput.parentidnumber);
        if (resp) {
          if (!resp?.idnumber) {
            setbursaryinput({
              secondarySchool:bursaryinput?.secondarySchool,
              parentidnumber:bursaryinput?.parentidnumber,
              parentphonenumber:bursaryinput?.phonenumber,
              parent_full_name:bursaryinput?.name,
              admissionnumber: bursaryinput?.admissionnumber,
              fullname:bursaryinput?.fullname,
              formorclass:bursaryinput?.formorclass,
              county:bursaryinput?.county,
              sub_county:bursaryinput?.sub_county,
              ward:bursaryinput?.ward,
              applicationperiodyear:bursaryinput?.applicationperiodyear,
              applicationperiodmonth:bursaryinput?.applicationperiodmonth,
              })
              const bursarypayload={
                applicationperiodyear:bursaryinput.applicationperiodyear,
                applicationperiodmonth:bursaryinput.applicationperiodmonth,
                parentward:Number(bursaryinput.ward),
                secondarySchool:parseInt(bursaryinput.secondarySchool),
                parentidnumber:parseInt(bursaryinput.parentidnumber),
                parentfullname:bursaryinput.parent_full_name ,
                parentphonenumber:bursaryinput.parentphonenumber ,
                admissionnumber:bursaryinput.admissionnumber ,
                fullname:bursaryinput.fullname ,
                formorclass:bursaryinput.formorclass,
                county:bursaryinput.county,
                subcounty:bursaryinput.sub_county
      
                // formorclass:parseInt(bursaryinput.formorclass.split('-')[0]),
              }
              console.log("does not exist ",bursaryinput);
              console.log("does not exist payload ",bursarypayload);
              applybursary(bursarypayload).then((response)=>{
                console.log("logging response from server ",response)
                if(response){
                  setserverresponse(response?.message)
                seterror([])
                if(response.issuccess){
                  emptyfields()
                }
              }
              }).catch((error)=>{
                seterror(error)
                console.log("logging server errors ",error)
              });

          }else{
            console.log("exiss ",bursaryinput.parentidnumber)
            
            setbursaryinput({
              secondarySchool:bursaryinput?.secondarySchool,
              parentidnumber:bursaryinput?.parentidnumber,
              parentphonenumber:resp?.phonenumber!==bursaryinput.parentphonenumber?bursaryinput.parentphonenumber:resp?.phonenumber,
              parent_full_name:resp?.name !==bursaryinput.parent_full_name?bursaryinput.parent_full_name: resp?.name,
              admissionnumber: bursaryinput?.admissionnumber,
              fullname:bursaryinput?.fullname,
              formorclass:bursaryinput?.formorclass,
              county:bursaryinput?.county,
              sub_county:bursaryinput?.sub_county,
              ward:bursaryinput?.ward,
              applicationperiodyear:bursaryinput?.applicationperiodyear,
              applicationperiodmonth:bursaryinput?.applicationperiodmonth,
            })
            handleDialog("The idnumber provided exists you can click yes to proceed with existint parent or cancel to add a new idnumber?", true, bursaryinput.parentidnumber);
          }

        }
      } catch (error) {
        console.log("error", error);
      }

    }
      const handlesubmit=(event)=>{
          event.preventDefault();
          console.log("logging bursaryinput ",bursaryinput)
          
          if(event.target.value===''){
            alert("county may not be empty")
            return false
         }else{

           checkiftheparentexistsbygivenidnumber();
         }
       }

    const checkifthestudentexistswithadmandschool=async (dataa)=>{
      const data=mydata()
         try {
        const resp = await doesstudentexistswithadmnoandschool(dataa);
        if (resp?.fullname) {

          setbursaryinput({
            // secondarySchool:data.secondarySchool!==''?data.secondarySchool:'',
            secondarySchool: dataa?.schoolId,
            county: data.county !== '' ? data.county : '',
            parentidnumber: data.parentidnumber !== '' ? data.parentidnumber : '',
            parentphonenumber: data.parentphonenumber !== '' ? data.parentphonenumber : '',
            parent_full_name: data.parentfullname !== '' ? data.parentfullname : '',
            admissionnumber: data.admissionnumber !== '' ? data.admissionnumber : '',
            fullname: resp.fullname,
            formorclass: data.formorclass !== '' ? data.formorclass : '',
            sub_county: data.subcounty !== '' ? data.subcounty : '',
            ward: data.ward !== '' ? data.ward : '',
            // applicationperiodyear:openapplicationperiods?.year,
            // applicationperiodmonth:openapplicationperiods?.month,
            applicationperiodyear: openapplicationperiods?.year,
            applicationperiodmonth: openapplicationperiods?.month,
          });
        } else {
          setbursaryinput({
            secondarySchool: data.secondarySchool !== '' ? data.secondarySchool : '',
            county: data.county !== '' ? data.county : '',
            parentidnumber: data.parentidnumber !== '' ? data.parentidnumber : '',
            parentphonenumber: data.parentphonenumber !== '' ? data.parentphonenumber : '',
            parent_full_name: data.parentfullname !== '' ? data.parentfullname : '',
            admissionnumber: data.admissionnumber !== '' ? data.admissionnumber : '',
            fullname: '',
            formorclass: data.formorclass !== '' ? data.formorclass : '',
            sub_county: data.subcounty !== '' ? data.subcounty : '',
            ward: data.ward !== '' ? data.ward : '',
            applicationperiodyear: openapplicationperiods?.year,
            applicationperiodmonth: openapplicationperiods?.month,
          });
        }
        console.log("lennnts ", bursaryinput.fullname);
      } catch (error) {
        console.log("error", error);
      }
       }
      
 const checkiftheparentexistsbygivenidnumbe=async(e)=>{
   e.preventDefault();
   try {
    const resp = await findbyparentidnumberonchange(bursaryinput.parentidnumber);
    console.log("ree",resp)
    if (!resp?.idnumber) {
      console.log("none")
        setbursaryinput({
          secondarySchool:bursaryinput?.secondarySchool,
          parentidnumber:bursaryinput?.parentidnumber,
          parentphonenumber:bursaryinput?.phonenumber,
          parent_full_name:bursaryinput?.name,
          admissionnumber: bursaryinput?.admissionnumber,
          fullname:bursaryinput?.fullname,
          formorclass:bursaryinput?.formorclass,
          county:bursaryinput?.county,
          sub_county:bursaryinput?.sub_county,
          ward:bursaryinput?.ward,
          applicationperiodyear:bursaryinput?.applicationperiodyear,
          applicationperiodmonth:bursaryinput?.applicationperiodmonth,
          })
         

      }else{
        console.log("here")
        setbursaryinput({
          secondarySchool:bursaryinput?.secondarySchool,
          parentidnumber:resp?.idnumber,
          parentphonenumber:resp?.phonenumber,
          parent_full_name:resp?.name,
          admissionnumber: bursaryinput?.admissionnumber,
          fullname:bursaryinput?.fullname,
          formorclass:bursaryinput?.formorclass,
          county:bursaryinput?.county,
          sub_county:bursaryinput?.sub_county,
          ward:bursaryinput?.ward,
          applicationperiodyear:bursaryinput?.applicationperiodyear,
          applicationperiodmonth:bursaryinput?.applicationperiodmonth,
          })
     

    }
  } catch (error) {
    console.log("error", error);
  }
  
 }
       if(isloading){
         <LoadingIndicator/>
       }        
       let formorclasses;
       let secschoolsss;
       console.log("logging the length ",secschools?.content?.length)
       if(secschools?.content.length>0){
        /*secschoolsss=secschools?.content.map((school,idx)=>{
          return<><option key={school?.id} value={school?.id}>{school?.school}--{school?.county?.county}</option></>
        })*/
        secschoolsss=secschools?.content.map(function (school) {
          return { value: school.id, label: school.school+'--'+school?.county?.county};
        })


       }
       formorclasses=formsorclasses.map((form,idx)=>{
         return<><option key={idx} value={form}>{form}</option></>
       })
       let getcounties;
       if(iscountyfetchloading){
        //  getcounties=<option>Please wait...</option>
       }else {
         if(!(counties?.content?.length>0)){
          //  getcounties=<option>No data available at the moment</option>
         }else{
          //  getcounties=counties?.content?.map((county,idx)=>{
          //    return<><option key={idx} value={county.code}>{county.county}-{county.code}</option></>
          //  })
          getcounties=counties?.content.map(function (county) {
            return { value: county.code, label: county.county+'--'+county?.code};
          })
         }
       }
  //fetching subcounties
        let getsubcounties;
        if(issubcountyfetchloading){
          // getsubcounties=<option>Please wait...</option>
        }else{
          if(!(countysubcounties?.content?.length>0)){
              // getsubcounties=<option>Data not available</option>
          }else{
            /*getsubcounties=countysubcounties?.content?.map((sub,idx)=>{
              return <><option key={idx} value={sub.id}>{sub.subcounty}</option></>
            })*/
            getsubcounties=countysubcounties?.content.map(function (sub) {
              return { value: sub.id, label: sub.subcounty};
            })
          }
        }

        //fetching subcountywards
        let getwards;
        if(iswardfetchloading){
          // getwards=<option>Please wait...</option>
        }else{
          if(!(subcountywards?.content?.length>0)){
                  // getwards=<option>No data available</option>
          }else{
            /*getwards=subcountywards?.content?.map((ward,idx)=>{
              return <><option key={idx} value={ward.id}>{ward.ward}</option></>
            })*/
            getwards=subcountywards?.content.map(function (ward) {
              return { value: ward.id, label: ward.ward};
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
              <div className="col-md-10">{serverresponse && <span className="help-block text-danger card-title">{serverresponse}</span>}</div>
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
                     <p> <h3 className="card-title">Sec and special schools</h3></p>
                      
                      <p>
                      
                     {/* <center> {error && <span className="help-block text-danger card-title">{error.fullname}</span>}</center> */}
                      </p>      
                    </div>
                      <div className="card-body">
                     
                        <div className="row">
                            <p>Application period</p>
                            <div className="col-md-6">
                            <div className="form-group">
                            <label htmlFor="applicationperiodyear" className="control-label">Year</label>
                              {/* <select   name="applicationperiodyear" id="checkboxselect" className='form-control' onChange={(e) => { handleInput(e); onapplicationperiodyearchange(e) }} value={bursaryinput?.applicationperiodyear} > */}
                              <select   name="applicationperiodyear" id="checkboxselect" className='form-control' onChange={(e) => { handleInput(e) }} value={bursaryinput?.applicationperiodyear} >
                              {/* <option value="">select year</option> */}
                              <option value={openapplicationperiods.year} selected>{openapplicationperiods.year}</option>
                              {/* {openapplicationperiodyear} */}
                            </select>
                            </div>
                            </div> 
                            
                          
                      <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="applicationperiodmonth">Select Month</label>
                                <select name="applicationperiodmonth" id="" onChange={handleInput} value={bursaryinput?.applicationperiodmonth} className='form-control '>
                                {/* <option value="">Select month</option> */}
                                <option value={openapplicationperiods.month} selected>{openapplicationperiods.month}</option>
                                {/* {openapplicationyearmonths} */}
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
                            {/* <select name="secondarySchool" onChange={handleInput} value={bursaryinput?.secondarySchool} className={(error?.secondarySchool)? 'form-control is-invalid':'form-control'} >
                                <option>Select school</option>
                                {secschoolsss}
                                <span className="help-block text-danger">{error?.secondarySchool}</span>
                              </select> */}
                              <Select 
                            placeholder="Type to search"
                            name="secondarySchool"
                            options = {secschoolsss}
                            onChange={handleInputsecschool}
                            autoFocus={true}
                        /> 



                            </div>       
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                            <label htmlFor="fullname" className="control-label">Student name</label>
                              <input type="text" name="fullname" onChange={handleInput} value={bursaryinput?.fullname} className={(error?.fullname)? 'form-control is-invalid':'form-control'}   placeholder="your full name" />
                              <span className="help-block text-danger">{error?.fullname}</span>
                            </div>       
                          </div> 
                          
                         
                          <div className="col-md-6">
                            <div className="form-group">
                            <label htmlFor="formorclass" className="control-label">class/form</label>
                            <select name="formorclass" onChange={handleInput} value={bursaryinput?.formorclass} className={(error?.formorclass)? 'form-control is-invalid':'form-control'} >
                                <option>Select form/class</option>
                                {formorclasses}
                              </select>
                                <span className="help-block text-danger">{error?.formorclass}</span>
                              </div>       
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                            <label htmlFor="parentidnumber" className="control-label">Id number</label>
                                 {/* <input type="text" name="parentidnumber"  onChange={handleInput}   value={bursaryinput?.parentidnumber} className={(error?.parentidnumber)? 'form-control is-invalid':'form-control'}  placeholder="Your parent id number" /> */}
                                 <input type="text" name="parentidnumber"  onChange={handleInput} onPointerLeave={(e)=>checkiftheparentexistsbygivenidnumbe(e)}   value={bursaryinput?.parentidnumber} className={(error?.parentidnumber)? 'form-control is-invalid':'form-control'}  placeholder="Your parent id number" />
                                 {/* <input type="text" name="parentidnumber"  onChange={handleInput} onPointerOut={(e)=>checkiftheparentexistsbygivenidnumbe(e)}   value={bursaryinput?.parentidnumber} className={(error?.parentidnumber)? 'form-control is-invalid':'form-control'}  placeholder="Your parent id number" /> */}

                              <span className="help-block text-danger">{error?.parentidnumber}</span>
                            </div>       
                          </div>
                          
                           

                          <div className="col-md-6">
                            <div className="form-group">
                            <label htmlFor="parent_full_name" className="control-label">Parent full name</label>
                              <input type="text" name="parent_full_name" onChange={handleInput} value={bursaryinput?.parent_full_name} id="parent_full_nameid" className={(error?.parent_full_name)? 'form-control is-invalid':'form-control'}  placeholder="parent full name"  />         
                              <span className="help-block text-danger">{error?.parent_full_name}</span>
                            </div>       
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                            <label htmlFor="parentphonenumber" className="control-label">Parent Phone contact</label>
                              <input type="text" name="parentphonenumber" onChange={handleInput} value={bursaryinput?.parentphonenumber} id="parentphonenumberid" className={(error?.parentphonenumber)? 'form-control is-invalid':'form-control'}  placeholder="parent phone contact"  />         
                              <span className="help-block text-danger">{error?.parentphonenumber}</span>
                            </div>       
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="county">Select county</label>
                             
                              {/* <select name="county"    onChange={(e) => { handleInput(e); selectsubcountiesbasedofcounty(e) }}   className={(error?.county)? 'form-control is-invalid':'form-control'} >
                                <option value=''>Select county</option>
                                {getcounties}
                                <span className="help-block text-danger">{error?.county}</span>
                              </select> */}
                              <Select 
                            placeholder="Type to search"
                            name="county"
                            options = {getcounties}
                            onChange={handleInputcounty}
                            autoFocus={true}
                        /> 
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="sub_county">Select subcounty</label>

                              {/* <select name="sub_county" onChange={(e) => { handleInput(e); fetchsubcountyywards(e) }} value={bursaryinput?.sub_county} className={(error?.sub_county)? 'form-control is-invalid':'form-control'} >
                                <option>Select sub_county</option>
                                {getsubcounties}
                                <span className="help-block text-danger">{error?.sub_county}</span>
                              </select> */}
                              <Select 
                            placeholder="Type to search"
                            name="sub_county"
                            options = {getsubcounties}
                            onChange={handleInputsubcounty}
                            autoFocus={true}
                        /> 
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="ward">Select ward</label>
                              {/* <select name="ward" onChange={handleInput} value={bursaryinput?.ward} className={(error?.ward)? 'form-control is-invalid':'form-control'} >
                                <option>Select ward</option>
                                {getwards}
                                <span className="help-block text-danger">{error?.ward}</span>
                              </select> */}
                              <Select 
                            placeholder="Type to search"
                            name="ward"
                            options = {getwards}
                            onChange={handleInputward}
                            autoFocus={true}
                        /> 
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
        


         {
           dialog.isLoading && <Dialog 
                                  message={dialog.message}
                                onDialog={areYouSure}
                                parentidnumber={dialog.parentidnumber} 
                                />
         }
      

               </Fragment>
        )
    
}
