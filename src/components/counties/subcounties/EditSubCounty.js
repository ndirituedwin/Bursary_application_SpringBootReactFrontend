
import React,{Fragment,useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import { updatesubcounty,fetchallcountiess, fetchsubcountybyidd } from '../../../constants/ApiUtils';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/Routes'
import Select from 'react-select'
export default function EditSubCounty() {
    const params=useParams();

    const [savesubcountyresponse, setsavesubcountyresponse] = useState([])
    const [savesubcountyerror, setsavesubcountyerror] = useState(null)
   const [subcountydata, setsubcountydata] = useState({
    county_code:'',
    subcounty:'',
  })
  const [counties, setcounties] = useState([])
  const [countiesloading, setcountiesloading] = useState(true)
  const [countiesfetcherror, setcountiesfetcherror] = useState()
   const [fetchedsubcounty, setfetchedsubcounty] = useState()
    const [fetchsubcountywithiderr, setfetchsubcountywithiderr] = useState()
    const [isloading, setisloading] = useState(true)

  useEffect(() => {
    fetchallcounties();
    fetchsubcountyid();
}, [params.subcountyId])

const fetchsubcountyid=async ()=>{
    try {
         const resp = await fetchsubcountybyidd(params.subcountyId);
         if (resp) {
             setfetchedsubcounty(resp);
             setisloading(false)
             console.log("fetched ",resp)
         }
     } catch (error) {
         setfetchsubcountywithiderr(error);
         setisloading(false)
     }
}
const fetchallcounties=async ()=>{
  try {
          const resp = await fetchallcountiess();
          console.log("counties fetched ",resp)
          
          setcounties(resp); 
          setcountiesloading(false);
               } catch (error) {
          setcountiesfetcherror(error); setcountiesloading(false);
      }
 
  }
   const handleInput=(e)=>{
       e.preventDefault()
       setsubcountydata({...subcountydata,[e.target.name]:e.target.value})
   }
   const handlesubmit=(e)=>{
       e.preventDefault();
       const data={
        subcounty:subcountydata.subcounty,
        county_code:Number(subcountydata.county_code),
        id:Number(params.subcountyId)
       }
       console.log("data",data)

       return
       updatesubcounty(data).then((resp)=>{
             if(resp){
                 setsavesubcountyresponse(resp)
                 console.log("The save bursary response ",resp)
             }
       }).catch((error)=>{
           setsavesubcountyerror(error)
       })
   }
   const handleInputcounty=(selectedOption)=>{
    const data={
      county_code:subcountydata.county_code,
      subcounty:subcountydata.subcounty,

    }
   setsubcountydata({
     county_code:selectedOption.value,
     subcounty:data.subcounty!==''?data.subcounty:'',

    
   })
   
 }
   let getcounties;
   if(countiesloading){
   }else {
     if(!(counties?.content?.length>0)){
     }else{
      
      getcounties=counties?.content.map(function (county) {
        return { value: county.code, label: county.county+'--'+county?.code};
      })
     }
   }

   let data;
    if(isloading){
        data=  <img src="/images/misc/loading.gif" alt="Loading..." />
      }   
   
       data= <div className="content-wrapper">
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
                    <Link to='' className='btn btn-default'>Add Ward</Link>
                  </div>
                  <div className="col-md-4">
                    <Link to={ROUTES.SHOWALLSUBCOUNTIES} className='btn btn-default'>View SubCounties</Link>
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
            <div className="col-md-10">{savesubcountyresponse && <span className="help-block text-danger card-title">{savesubcountyresponse?.message?savesubcountyresponse?.message:''}</span>}</div>
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
                   <p> <h3 className="card-title">SubCounties</h3></p>
                  </div>
                    <div className="card-body">
                    <div className="row">
                      <div className="col-md-4">
   
                      </div>
                    </div>
                      <div className="row">  
                    
                      <div className="col-md-6">
                          <div className="form-group">
                          <label htmlFor="subcounty" className="control-label">Sub county </label>
                            <input type="text" name="subcounty" onChange={handleInput} value={fetchedsubcounty?.subcounty} className={(savesubcountyerror?.subcounty)? 'form-control is-invalid':'form-control'}   placeholder=" sub county" />
                            {/* <input type="text" name="subcounty"  value={fetchedsubcounty?.subcounty} className={(savesubcountyerror?.subcounty)? 'form-control is-invalid':'form-control'}   placeholder=" sub county" /> */}
                            <span className="help-block text-danger">{savesubcountyerror?.subcounty}</span>
                          </div>       
                        </div> 
                        <div className="col-md-6">
                               <div className="form-group">
                                 <label htmlFor="county">Select county</label>
                                 <Select 
                               placeholder="Type to search"
                               name="county"
                               options = {getcounties}
                               onChange={handleInputcounty}
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
   
  return (
    <Fragment>
     {data}
   

          </Fragment>
  )
}
