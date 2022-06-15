
import * as ROUTES from '../../constants/Routes'

import React,{useEffect,useState} from 'react'
import { useNavigate,Redirect } from 'react-router';
import HomePage from '../layouts/HomePage';
import Loading from './../loading/index';
import { BrowserRouter as Router,Outlet, Route,Navigate,Routes } from 'react-router-dom';
import axios from 'axios';
function AdminPrivateRoutes(props,{...rest}) {
    console.log("logging rest inside adminprivateroutes ",rest)
    console.log("logging props inside adminprivateroutes ",props)
          
    const [loading, setloading] = useState(true)
    const [authenticated, setauthenticated] = useState(false)
    const navigate=useNavigate();
         useEffect(() => {
             if(props?.isAuthenticated){
                 setauthenticated(true)
             }
             setloading(false)
             
         }, [props?.isAuthenticated])
         axios.interceptors.response.use(undefined,function axiosRetryInterceptor(err){
            if(err.response.status===401){
                console.log("logging error response from axios interceptors ",err.response)
                navigate(ROUTES.SIGNINCOMPONENT)
            }
            return Promise.reject(err);
        });
        if (loading) {
               return <div className="container">
              <Loading/>
               </div>        
    }else{
        console.log("reached here men",props.isAuthenticated)
        console.log("is the user authenticated ",authenticated);
        console.log("is the user authenticated ",props);        
        return (
            
            <>
            <div>helo world</div>
            <Routes>
            <Route path='' {...rest} element={<HomePage {...props}/>}/>
             {/* <Route {...rest}
                element={({props,location})=>
                    props.isAuthenticated
                     ?
                    (<HomePage {...props}/>)
                    :
                  (<Navigate to={{pathname:ROUTES.SIGNINCOMPONENT,state:{from:location}}}/>)
                }
            />  */}
            </Routes> 
            </>

        )
               
           }    

}

export default AdminPrivateRoutes
