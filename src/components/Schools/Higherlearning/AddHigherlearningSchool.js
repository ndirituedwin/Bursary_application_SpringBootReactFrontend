import React, { Fragment,useState,useEffect } from 'react'

import { Link } from 'react-router-dom'
import * as ROUTES from '../../../constants/Routes'
import { fetchhigherlearningcategories, savehigherlearning } from './../../../constants/ApiUtils';
export default function AddHigherlearningSchool() {

    const [schooldata, setschooldata] = useState({
         'name':'',
         'higheEducationCategoryId':''
    })
    const [saveschoolresponse, setsaveschoolresponse] = useState()
    const [saveschoolerror, setsaveschoolerror] = useState()
    const [allschoolcategories, setallschoolcategories] = useState([])
    const [schoolcatloading, setschoolcatloading] = useState(true)


    useEffect(() => {
         fetchschoolcategories()
    }, [])
    const fetchschoolcategories=()=>{
        return fetchhigherlearningcategories().then((resp)=>{
            if(resp){
                setallschoolcategories(resp)
                setschoolcatloading(false)
            }
            console.log("The response ",resp)
        }).catch((error)=>{
            console.log("error ",error)
            setschoolcatloading(false)
        })
    }
    const handleInput=(e)=>{
          e.preventDefault()
          setschooldata({...schooldata,[e.target.name]:e.target.value})
            console.log("BursaryInput ",schooldata)

    }
    const handlesubmit=(e)=>{
        e.preventDefault();
        const data={
            name:schooldata.name,
            higheEducationCategoryId:schooldata.higheEducationCategoryId
        }
        savehigherlearning(data).then((resp)=>{
            if(resp){
                setsaveschoolresponse(resp)
                setschooldata({
                  name:'',
                  higheEducationCategoryId:''
                })
            }
            console.log("thetete",resp)
        }).catch((error)=>{
            console.log("error",error)
            setsaveschoolerror(error)
           
        })
    }
    let higherlearningcategories;

    if(schoolcatloading){
       higherlearningcategories=<option>Please wait...</option>
    }else{
      if(!allschoolcategories.length>0){
       higherlearningcategories=<option>No data available</option>
     }else{
        higherlearningcategories=allschoolcategories?.map((categ,idx)=>{
          return <><option key={idx} value={categ.id}>{categ.category}</option></>
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
                   <li className="breadcrumb-item active">Add school</li>
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
         {/* <div className="col-md-10">{serverresponse && <span className="help-block text-danger card-title">{serverresponse}</span>}</div> */}
         <div className="col-md-10">{saveschoolresponse && <span className="help-block text-danger card-title">{saveschoolresponse?.message}</span>}</div>
         <div className="col-md-2">

         </div>
       </div> 
       <div className="row">
         <div className="col-md-2"></div>
         <div className="col-md-10">
         </div>
         <div className="col-md-2"></div>
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
                <p> <h3 className="card-title">Higher Learning</h3></p>
                
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-3">

                <Link to={ROUTES.SHOWALLHIGHERSCHOOLS} className="btn btn-info ">Show</Link>
                    </div>
                    <div className="col-md-3">
                <Link to={ROUTES.ADDHIGHERSCHOOLCATEGORY} className="btn btn-info pull-right">Add School category</Link>

                    </div>
                </div>
               </div>
                 <div className="card-body">
                 <div className="row">
                   <div className="col-md-4">

                   </div>
                 </div>
                   <div className="row">  
                 
                     <div className="col-md-6">
                       <div className="form-group">
                       <label htmlFor="name" className="control-label">School name</label>
                       <input type="text" name="name" onChange={handleInput} value={schooldata?.name} className={(saveschoolerror?.name)? 'form-control is-invalid':'form-control'} placeholder="school name" />
                           <span className="help-block text-danger">{saveschoolerror?.name}</span>
                       </div>       
                     </div>  
                     <div className="col-md-6">
                       <div className="form-group">
                       <label htmlFor="higheEducationCategoryId" className="control-label">School Category</label>
                       <select name="higheEducationCategoryId" onChange={handleInput} value={schooldata?.higheEducationCategoryId} className={(saveschoolerror?.higheEducationCategoryId)? 'form-control is-invalid':'form-control'} >
                         <option>Select school category</option>
                           {higherlearningcategories}
                         </select>
                           <span className="help-block text-danger">{saveschoolerror?.higheEducationCategoryId}</span>
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
