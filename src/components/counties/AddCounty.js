
import React,{useState,Fragment} from 'react'
import { savecounty } from '../../constants/ApiUtils'
import { Link } from 'react-router-dom'
import* as ROUTES from '../../constants/Routes'

export default function AddCounty() {
    const [savescountyresponse, setsavescountyresponse] = useState([])
    const [savescountyerror, setsavescountyerror] = useState(null)
   const [countydata, setcountydata] = useState({
       county:'',
       code:'',
       region:'',
       area:'',
       capital:''
   })
   const handleInput=(e)=>{
       e.preventDefault()
       setcountydata({...countydata,[e.target.name]:e.target.value})
   }
   const handlesubmit=(e)=>{
       e.preventDefault();
       const data={
        county:countydata.county,
        code:Number(countydata.code),
        region:countydata.region,
        area:countydata.area,
        capital:countydata.region,
       }

       savecounty(data).then((resp)=>{
             if(resp){
                 setsavescountyresponse(resp)
             }
       }).catch((error)=>{
           setsavescountyerror(error)
       })
   }
    return (
    <Fragment>
    <div className="content-wrapper">
    <section className="content-header">
           <div className="container-fluid">
             <div className="row mb-2">
               <div className="col-sm-6">
                 {/* <h1>Catalogues</h1> */}
               </div>
               <div className="col-sm-6">
                 <ol className="breadcrumb float-sm-right">
                   <li className="breadcrumb-item"><Link to={ROUTES.MAINWITHFORWARDSLASH}>Home</Link></li>
                   <li className="breadcrumb-item active">Add county</li>
                 </ol>
               </div>
             </div>
             <div className="row">
               <div className="col-md-4">
                 <Link to={ROUTES.ADDSUBCOUNTY} className='btn btn-default'>Add SubCounty</Link>
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
         <div className="col-md-10">{savescountyresponse && <span className="help-block text-danger card-title">{savescountyresponse?.message}</span>}</div>
         <div className="col-md-2">

         </div>
       </div> 
       <div className="row">
         <div className="col-md-2"></div>
         <div className="col-md-10">
         {/* <div className="col-md-10">{savescountyerror && <span className="help-block text-danger card-title">{savescountyerror.countyCode}</span>}</div> */}
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
                <p> <h3 className="card-title">Counties</h3></p>
               </div>
                 <div className="card-body">
                 <div className="row">
                   <div className="col-md-4">

                   </div>
                 </div>
                   <div className="row">  
                 
                   <div className="col-md-6">
                       <div className="form-group">
                       <label htmlFor="county" className="control-label">county </label>
                         <input type="text" name="county" onChange={handleInput} value={countydata?.county} className={(savescountyerror?.county)? 'form-control is-invalid':'form-control'}   placeholder="county" />
                         <span className="help-block text-danger">{savescountyerror?.county}</span>
                       </div>       
                     </div> 
                     <div className="col-md-6">
                       <div className="form-group">
                       <label htmlFor="code" className="control-label">code </label>
                       <input type="text" name="code" onChange={handleInput} value={countydata?.code} className={(savescountyerror?.code)? 'form-control is-invalid':'form-control'} placeholder="enter county code " />
                           <span className="help-block text-danger">{savescountyerror?.code}</span>
                       </div>       
                     </div>  
                     
                     <div className="col-md-6">
                       <div className="form-group">
                       <label htmlFor="region" className="control-label">region </label>
                         <input type="text" name="region" onChange={handleInput} value={countydata?.region} className={(savescountyerror?.region)? 'form-control is-invalid':'form-control'}   placeholder="county region" />
                         <span className="help-block text-danger">{savescountyerror?.region}</span>
                       </div>       
                     </div> 
                     <div className="col-md-6">
                       <div className="form-group">
                       <label htmlFor="area" className="control-label">area(m2)</label>
                       <input type="text" name="area" onChange={handleInput} value={countydata?.area} className={(savescountyerror?.area)? 'form-control is-invalid':'form-control'} placeholder="county aream2" />
                           <span className="help-block text-danger">{savescountyerror?.area}</span>
                       </div>       
                     </div> 
                     <div className="col-md-6">
                       <div className="form-group">
                       <label htmlFor="capital" className="control-label">capital </label>
                         <input type="text" name="capital" onChange={handleInput} value={countydata?.capital} className={(savescountyerror?.capital)? 'form-control is-invalid':'form-control'}   placeholder="county capital" />
                         <span className="help-block text-danger">{savescountyerror?.capital}</span>
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
