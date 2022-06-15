

import React, { Fragment,useState,useEffect } from 'react'
import * as ROUTES from '../../../constants/Routes'
import { Link } from 'react-router-dom';
import { saveapplicationperiod, viewapplicationperiods } from '../../../constants/ApiUtils';

export default function ApplicationPeriod(props) {
    console.log("logging props ",props)

    const [error, seterror] = useState([])
    const [bursaryInput, setbursaryInput] = useState({'year':'','month':''})
    const [serverresponse, setserverresponse] = useState()
    const [dates, setdates] = useState([])
    const [months, setmonths] = useState([])
     const [isloading, setisloading] = useState(true)
     const [issaving, setissaving] = useState(false)
     const [applicationperiods, setapplicationperiods] = useState([])
    const [achangeoccured, setachangeoccured] = useState(null)
    useEffect(() => {
      viewapplicationperiodssss();
        let  date=new Date();
        let currentyear=date.getFullYear()
        let lastyear=date.getFullYear()-1;
        let nextyear=date.getFullYear()+1;
        let arra=[];
        let months=[]; 
        arra.push(lastyear,currentyear,nextyear)
        months.push('January','February','March','April','May','June','July','August','September','October','November','December')
   
        setdates(arra)
        setmonths(months)
         
        setisloading(false)     
    }, [achangeoccured])
    const viewapplicationperiodssss=async ()=>{
      try {
        const resp = await viewapplicationperiods();
        setapplicationperiods(resp);
        setisloading(false);
      } catch (error) {
        console.log("error ", error);
        seterror(error);
        setisloading(false);
      }
    }
    

    const handleInput=(event)=>{
        event.preventDefault();
        setbursaryInput({...bursaryInput,[event.target.name]:event.target.value})
      }

    const handlesubmit=(event)=>{
        event.preventDefault();
        setachangeoccured("no")
        setissaving(true)
        const data={
            year:bursaryInput.year,
            month:bursaryInput.month
        }

        saveapplicationperiod(data).then((resp)=>{
            setserverresponse(resp)
            setachangeoccured("yes")
            setissaving(false)
            seterror([])
        }).catch((error)=>{
            seterror(error)
            setissaving(false)
        })
        
        
    } 
    let years;
    let monthhs;
    if (isloading) {
        years=<option>Loading...</option>
        monthhs=<option>Loading...</option>

    }else{
        years=dates.map((year,idx)=>{
            return <><option key={idx} value={year}>{year}</option></>
        })
        monthhs=months.map((month,idx)=>{
            return <><option key={idx} value={month}>{month}</option></>
        })
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
                     <td>{period.open?'Open':'Closed'}</td>
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
                      <h1>Catalogues</h1>
                    </div>
                    <div className="col-sm-6">
                      <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"><Link to={ROUTES.MAINWITHFORWARDSLASH}>Home</Link></li>
                        <li className="breadcrumb-item active">Applcation period</li>
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
                     <div className="col-md-4"></div>
                     <div className="col-md-4"></div>
                     <div className="col-md-4"><Link to={ROUTES.VIEWAPPLICATIONPERIODSURL} className="btn btn-default">View application period</Link></div>
                   </div>
              <div className="row">
              <div className="col-md-2"></div>
              <div className="col-md-10">{serverresponse && <span className="help-block text-danger card-title">{serverresponse?.message}</span>}</div>
              <div className="col-md-2">

              </div>
            </div> 
                    </div>
                    <form  onSubmit={handlesubmit} role="form"  encType="multipart/form-data">
                    <div className="card-body">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                            <label htmlFor="year" className="control-label">Select year</label>
                            
                              <select name="year" onChange={handleInput} value={bursaryInput?.year} className={(error?.year)? 'form-control is-invalid':'form-control'} >
                                <option value="">Select year</option>
                                {years}
                              </select>
                                <span className="help-block text-danger">{error?.year}</span>
                            </div>       
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                            <label htmlFor="month" className="control-label">Enter Month</label>
                              <select name="month" onChange={handleInput} value={bursaryInput?.month} className={(error?.month)? 'form-control is-invalid':'form-control'} >
                                <option value="">Select month</option>
                                {monthhs }
                              </select>
                              <span className="help-block text-danger">{error?.month}</span>
                            </div>            
                          </div>                    
                        </div>
                      
                      </div>
                      <div className="card-footer">
                        <button  type="submit"  className="btn btn-primary" disabled={issaving}>{issaving?<span className="spinner-grow spinner-grow-sm"></span>: 'Open' }</button>
                      </div>
                     </form>
                    </div>

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
                    </section>
         </div>

      </Fragment>
  )
}

