import React,{Fragment, useState,useEffect} from 'react'
import* as ROUTES from '../../constants/Routes'
import { Link } from 'react-router-dom';
import { fetchschoolcategories,fetchcounties, fetchschooltypes, savesecondaryschool } from '../../constants/ApiUtils';

export default function AddSchool() {

    const [schoolcategories, setschoolcategories] = useState([])
    const [schoolcategoriesloading, setschoolcategoriesloading] = useState(true)
    const [schoolcategoriesfetcherror, setschoolcategoriesfetcherror] = useState(null)
    const [schooltypes, setschooltypes] = useState([])
    const [schooltypesloading, setschooltypesloading] = useState(true)
    const [schooltypesfetcherror, setschooltypesfetcherror] = useState(null)
    const [counties, setcounties] = useState([])
    const [countiesloading, setcountiesloading] = useState(true)
    const [countiesfetcherror, setcountiesfetcherror] = useState(null)
    const [saveschoolerror, setsaveschoolerror] = useState(null)
    const [saveschoolresponse, setsaveschoolresponse] = useState()
    const [schooldata, setSchooldata] = useState({
        'code':'',
        'school':'',
        'categoryId':'',
        'typeId':'',
        'countyCode':''
    })
    useEffect(() => {
        fetchschoolcategoriess();
        fetchschooltypess();
        fetchcountiess();
    }, [])
    const fetchschoolcategoriess=async ()=>{
        try {
            const resp = await fetchschoolcategories();
            if (resp) {
              console.log("schoolcategories ",resp)
                setschoolcategories(resp);
                setschoolcategoriesloading(false);
            }
        } catch (error) {
            setschoolcategoriesfetcherror(error);
            setschoolcategoriesloading(false);
        }
    }
    const fetchschooltypess=async ()=>{
        try {
            const resp = await fetchschooltypes();
            if (resp) {
              console.log("setschooltypes ",resp)
              
                setschooltypes(resp);
                setschooltypesloading(false);
            }
        } catch (error) {
            setschooltypesfetcherror(error);
            setschooltypesloading(false);
        }
    } 
    const fetchcountiess=async ()=>{
      try {
            const resp = await fetchcounties();
            if (resp) {
              console.log("counties ",resp)
                
                setcounties(resp);
                setcountiesloading(false);
            }
        } catch (error) {
            setcountiesfetcherror(error);
            setcountiesloading(false);
        }
    }
    const handleInput=(e)=>{
        e.preventDefault();
        setSchooldata({...schooldata,[e.target.name]:e.target.value})
    }
    const handlesubmit=(e)=>{
      e.preventDefault();
      // e.target.innerText="Saving.."
      const data={

        code:Number(schooldata.code),
        school:schooldata.school,
        categoryId:Number(schooldata.categoryId),
        typeId:Number(schooldata.typeId),
         countyCode:Number(schooldata.countyCode)
      }
      
      console.log(data);
      savesecondaryschool(data).then((resp)=>{
               if (resp) {
                 setsaveschoolresponse(resp)
                //  setSchooldata({})
                if(resp.saved===true){
                  emptyfields();                  
                }
                console.log("resp",resp);
               }
      }).catch((error)=>{
        console.log("err",error);
         setsaveschoolerror(error)
      }) 
    }


     const emptyfields=()=>{
      return setSchooldata({
        'code':'',
        'school':'',
        'categoryId':'',
        'typeId':'',
        'countyCode':''
    }) 
     }


    let allschoolcategories;

    if(schoolcategoriesloading){
       allschoolcategories=<option>Please wait...</option>
    }else{
      if(!schoolcategories.length>0){
       allschoolcategories=<option>No data available</option>
     }else{
        allschoolcategories=schoolcategories?.map((categ,idx)=>{
          return <><option key={idx} value={categ.id}>{categ.category}</option></>
        })
        
      }
    }
    let allschooltypes;

    if(schooltypesloading){
       allschooltypes=<option>Please wait...</option>
    }else{
      if(!schooltypes.length>0){
       allschooltypes=<option>No data available</option>
     }else{
        allschooltypes=schooltypes?.map((type,idx)=>{
          return <><option key={idx} value={type.id}>{type.type}</option></>
        })
        
      }
    }
    let allcounties;

    if(countiesloading){
       allcounties=<option>Please wait...</option>
    }else{
      if(!counties?.content?.length>0){
       allcounties=<option>No data available</option>
     }else{
        allcounties=counties?.content?.map((county,idx)=>{
          return <><option key={idx} value={county.code}>{county.county}</option></>
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
             {/* <div className="col-md-10">{saveschoolerror && <span className="help-block text-danger card-title">{saveschoolerror.countyCode}</span>}</div> */}
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
                    <p> <h3 className="card-title">Sec and special schools</h3></p>
                   </div>
                     <div className="card-body">
                     <div className="row">
                       <div className="col-md-4">

                       </div>
                     </div>
                       <div className="row">  
                     
                       <div className="col-md-6">
                           <div className="form-group">
                           <label htmlFor="code" className="control-label">School code</label>
                             <input type="text" name="code" onChange={handleInput} value={schooldata?.code} className={(saveschoolerror?.code)? 'form-control is-invalid':'form-control'}   placeholder="your full name" />
                             <span className="help-block text-danger">{saveschoolerror?.code}</span>
                           </div>       
                         </div> 
                         <div className="col-md-6">
                           <div className="form-group">
                           <label htmlFor="school" className="control-label">School name</label>
                           <input type="text" name="school" onChange={handleInput} value={schooldata?.school} className={(saveschoolerror?.school)? 'form-control is-invalid':'form-control'} placeholder="school name" />
                               <span className="help-block text-danger">{saveschoolerror?.school}</span>
                           </div>       
                         </div>  
                         <div className="col-md-6">
                           <div className="form-group">
                           <label htmlFor="categoryId" className="control-label">School Category</label>
                           <select name="categoryId" onChange={handleInput} value={schooldata?.categoryId} className={(saveschoolerror?.categoryId)? 'form-control is-invalid':'form-control'} >
                               <option>Select school category</option>
                               {allschoolcategories}
                             </select>
                               <span className="help-block text-danger">{saveschoolerror?.categoryId}</span>
                           </div>       
                         </div>
                         <div className="col-md-6">
                           <div className="form-group">
                           <label htmlFor="typeId" className="control-label">School type</label>
                           <select name="typeId" onChange={handleInput} value={schooldata?.typeId} className={(saveschoolerror?.typeId)? 'form-control is-invalid':'form-control'} >
                               <option>Select school type</option>
                               {allschooltypes}
                             </select>
                               <span className="help-block text-danger">{saveschoolerror?.typeId}</span>
                           </div>       
                         </div>
                         <div className="col-md-6">
                           <div className="form-group">
                           <label htmlFor="countyCode" className="control-label">School location(County)</label>
                           <select name="countyCode" onChange={handleInput} value={schooldata?.countyCode} className={(saveschoolerror?.countyCode)? 'form-control is-invalid':'form-control'} >
                               <option>Select county</option>
                               {allcounties}
                             </select>
                               <span className="help-block text-danger">{saveschoolerror?.countyCode}</span>
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
