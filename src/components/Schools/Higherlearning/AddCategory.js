import React,{Fragment,useState} from 'react'
import { Link } from 'react-router-dom';
import { savehigherlearningcategory } from '../../../constants/ApiUtils';
import * as ROUTES from '../../../constants/Routes'
export default function AddCategory() {
    const [categorydata, setcategorydata] = useState({
        category:''
    })
    const [savecategoryresponse, setsavecategoryresponse] = useState()
    const [savecategoryerror, setsavecategoryerror] = useState()


    const handleInput=(e)=>{
        e.preventDefault()
        setcategorydata({...categorydata,[e.target.name]:e.target.value})

  }
  const handlesubmit=(e)=>{
    e.preventDefault();
    const data={
        category:categorydata.category,
    }
    savehigherlearningcategory(data).then((resp)=>{
        if(resp){
            setsavecategoryresponse(resp)
            setcategorydata({
              category:'',
            })
        }
        console.log("thetete",resp)
    }).catch((error)=>{
        console.log("error",error)
        setsavecategoryerror(error)
       
    })
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
         <div className="col-md-10">{savecategoryresponse && <span className="help-block text-danger card-title">{savecategoryresponse?.body?.category} {savecategoryresponse?.body?.message}</span>}</div>
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
                <Link to={ROUTES.ADDHIGHERSCHOOL} className="btn btn-info pull-right">Add School</Link>

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
                       <label htmlFor="category" className="control-label">Category</label>
                       <input type="text" name="category" onChange={handleInput} value={categorydata?.category} className={(savecategoryerror?.category)? 'form-control is-invalid':'form-control'} placeholder=" category" />
                           <span className="help-block text-danger">{savecategoryerror?.category}</span>
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
