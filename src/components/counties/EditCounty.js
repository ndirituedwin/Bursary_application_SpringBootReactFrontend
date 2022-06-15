import React,{Fragment} from 'react'

export default function EditCounty() {
  return (
    <Fragment>
 {/* <div className="content-wrapper">
    <section className="content-header">
           <div className="container-fluid">
             <div className="row mb-2">
               <div className="col-sm-6">
                 <h1>Catalogues</h1>
               </div>
               <div className="col-sm-6">
                 <ol className="breadcrumb float-sm-right">
                   <li className="breadcrumb-item"><Link to={ROUTES.MAINWITHFORWARDSLASH}>Home</Link></li>
                   <li className="breadcrumb-item active">Add county</li>
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
         <div className="col-md-10">{savescountyresponse && <span className="help-block text-danger card-title">{savescountyresponse?.message}</span>}</div>
         <div className="col-md-2">

         </div>
       </div> 
       <div className="row">
         <div className="col-md-2"></div>
         <div className="col-md-10">
         {/* <div className="col-md-10">{savescountyerror && <span className="help-block text-danger card-title">{savescountyerror.countyCode}</span>}</div> */}
        {/* </div>
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
                     
                     
                     
                     
                                                                
                
                   </div>
                 </div>
                 <div className="card-footer">
                   <button  type="submit" className="btn btn-primary">Save</button>
                 </div>
                


             </div>
         
           </div>
         </section>
  
     </form>
  
    </div> */}

          </Fragment>
  )
}

