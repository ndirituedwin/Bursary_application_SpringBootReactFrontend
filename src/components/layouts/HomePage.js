import { useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Menu from "./Sidebar";
import { useNavigate } from 'react-router';
import * as ROUTES from '../../constants/Routes'
import { BrowserRouter as Router,Routes,Route,Navigate,Outlet, Link,useLocation } from "react-router-dom";
import dashboardroutes from './../../constants/dashboardroutes';
import Dashboard from "./Dashboard";
export default function HomePage(props) {
  const navigate=useNavigate();  
  const location=useLocation()  
    console.log("logging props inside Homepage ",props.isAuthenticated);
    // console.log("logging the location ",location.pathname);
    useEffect(() => {
      if(!(props.isAuthenticated)){
        navigate(ROUTES.HOME)
        // console.log("you are not authenticated ",props.isAuthenticated)

      }
    }, [props.isAuthenticated])  
    const handleLogout=()=>{
      props.handleLogout()
    navigate(ROUTES.HOME)
    }
     

        return (    
          <div className="wrapper App">
            <Header  isAuthenticated={props?.isAuthenticated} currentUser={props?.currentUser} handleLogout={handleLogout}/>
           <Menu isAuthenticated={props?.isAuthenticated} currentUser={props?.currentUser}/> 
           {location.pathname==="/main"?
           <Dashboard/>   
            :
            null
           } 
          <Outlet />
          <Footer/>
        </div>            
            
        );
     
    
        
}