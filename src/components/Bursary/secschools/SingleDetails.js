


import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import { Fragment } from 'react';
import { viewdetails,awardbursary } from '../../../constants/ApiUtils';
// import { awardbursary, viewdetails } from '../../constants/ApiUtils';

function SingleDetails({isAuthenticated,currentUser}) {
    const params=useParams();
    const [details, setdetails] = useState()
    const [amount, setamount] = useState({
      'amount':''
    })
     const [isloading, setisloading] = useState(true)
     const [error, seterror] = useState([])
     const [isawarding, setisawarding] = useState(false)
     const [serverresponse, setserverresponse] = useState()

    console.log("logging params ",params.bursaryapplicationId)

    const handleInput=(event)=>{
      event.preventDefault();
      setamount({...amount,[event.target.name]:event.target.value})
    }
    useEffect(() => {
         viewdetails(params.bursaryapplicationId).then((response)=>{
             console.log("response ",response)
             setdetails(response)
             setisloading(false)
         }).catch((error)=>{
             seterror(error)
             setisloading(false)
             console.log("error ",error)
         })
    }, [params.bursaryapplicationId])

    const handleaward=(event)=>{
      event.preventDefault();
      setisawarding(true)
      console.log("details ",details.school.id)
     /* const amounttoaward={
        bursaryapplicationId:parseInt(params.bursaryapplicationId),
        schoolid:parseInt(details.school.id),
        amount:parseFloat(amount.amount)
      }*/
      const amounttoaward={
        applicationId:Number(params.bursaryapplicationId),
        schoolId:Number(details.school.id),
        amount:parseFloat(amount.amount),
        studentId:Number(details?.studentId)
 }
      awardbursary(amounttoaward).then((response)=>{
 
          if(response){
            setserverresponse(response)
            console.log("response",response);
            setisawarding(false);
          }
          setisawarding(false);

           
      }).catch((error)=>{
        setisawarding(false)
        seterror(error)
        console.log("Dddd",error);
      })
       
    }
    
    let data;

    if(isloading){
      data=  <img src="/images/misc/loading.gif" alt="Loading..." />
    }
    data=   <div className="content-wrapper">
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>Catalogues</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><link to="/admin" />Home</li>
              <li className="breadcrumb-item active">Products</li>
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
              <div className="col-md-10">{serverresponse && <span className="help-block text-danger card-title">{(serverresponse?.message? serverresponse?.message:serverresponse?.body?.message)}</span> }</div>
              <div className="col-md-2">              </div>
            </div> 
                    </div>
                    </div>
                    </div>
                    </section>
    <section className="content">
      <div className="container-fluid">
        <div className="card card-default">
          <div className="card-header">
            <h3 className="card-title">Products form</h3>
          </div>
          <form   role="form"  onSubmit={handleaward}>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  
                <div className='form-group'>
                    <label htmlFor="admnumbe" className="control-label">Admission number</label>
                    <input type="text" name=""   className='form-control ' value={details?.admissionnumber}  />
                    <span className="text-danger" ></span>
                  </div>
                </div>
                <div className="col-md-6">
                 
                  <div className='form-group'>
                    <label htmlFor="full name" className="control-label">full name</label>
                    <input type="text" name="fullname"  value={details?.fullname}  className='form-control' placeholder="enter a full name" />
                    <span className="text-danger" ></span>
                  </div>
                </div>
                <div className="col-md-6">
                 
                  <div className='form-group'>
                    <label htmlFor="application year" className="control-label">application year</label>
                    <input type="text" name="applicationYear"  value={details?.applicationYear}  className='form-control' placeholder="enter a application year" />
                    <span className="text-danger" ></span>
                  </div>
                </div>
                <div className="col-md-6">
                 
                  <div className='form-group'>
                    <label htmlFor="application month" className="control-label">application month</label>
                    <input type="text" name="applicationMonth"  value={details?.applicationMonth}  className='form-control' placeholder="enter a application month" />
                    <span className="text-danger" ></span>
                  </div>
                </div>
                <div className="col-md-6">
                <div className='form-group'>
                    <label htmlFor="school" className="control-label">school</label>
                    <input type="text" name="school" value={details?.school?.school}   className='form-control' placeholder="enter a school" />
                    <span className="text-danger" ></span>
                  </div>
  
                  <div className='form-group'>
                    <label htmlFor="studentparentname" className="control-label">student parent name</label>
                    <input type="text" name="studentparentname"   className='form-control '  value={details?.studentParent?.name} placeholder="enter a student parent name" />
                    <span className="text-danger" ></span>
                  </div>
  
                </div>
                <div className="col-md-6">
                <div className='form-group'>
                    <label htmlFor="studentparentphonenumber" className="control-label">student parent phone number</label>
                    <input type="text" name="studentparentphonenumber" value={details?.studentParent?.phonenumber}   className='form-control ' placeholder="enter a studentparentphonenumber" />
                    <span className="text-danger" ></span>
                  </div>
  
                  <div className='form-group'>
                    <label htmlFor="formorclass" className="control-label">Form/class</label>
                    <input type="text" name="formorclass"  value={details?.formorclass} className='form-control ' placeholder="enter a formorclass" />
                    <span className="text-danger" ></span>
                  </div>
                </div>
                <div className="col-md-6">
                <div className='form-group'>
                    <label htmlFor="amountaward" className="control-label">Enter amount to award</label>
                    <input type="text" name="amount" value={amount?.amount}  onChange={handleInput}   className='form-control ' placeholder="enter a amount to award" />
                    <span className="text-danger" >{serverresponse?.amountmaynotbenull}</span>
                  </div>
                </div>
                               
               
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary " disabled={isawarding}>{isawarding?<span className="spinner-grow spinner-grow-sm"></span>: 'Award' }</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>


    return (
        <Fragment>
           {data}
                </Fragment>
    )
    }


export default SingleDetails
