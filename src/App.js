
import { useEffect,useState } from 'react';
import { getcurrentuser, logoutcurrentuser } from './constants/ApiUtils';
import LoadingIndicator from './constants/LoadingIndicator';
import {BrowserRouter as Router,Route,Routes,Navigate} from 'react-router-dom'
import * as ROUTES from './constants/Routes'
import HomePage from './components/layouts/HomePage';
import Signin from './components/Auth/SignIn/Signin';
import Home from './containers/Home';
import Bursaryapplication from './components/Bursary/secschools/Bursaryapplication';
import SingleDetails from './components/Bursary/secschools/SingleDetails';
import Signup from './components/Auth/SignUp/Signup';
import ApplicationPeriod from './components/Bursary/Applicationperiod/ApplicationPeriod';
import ViewApplicationPeriods from './components/Bursary/Applicationperiod/ViewApplicationPeriods';
import BursaryAwards from './components/Bursary/secschools/BursaryAwards';
import AddSchool from './components/Schools/AddSchool';
import ShowSchools from './components/Schools/ShowSchools';
import EditSchool from './components/Schools/EditSchool';
import ViewBursaryApplications from './components/Bursary/secschools/ViewBursaryApplications';
import AddCounty from './components/counties/AddCounty';
import ShowCounties from './components/counties/ShowCounties';
import AddSubCounty from './components/counties/subcounties/AddSubCounty';
import EditSubCounty from './components/counties/subcounties/EditSubCounty';
import ShowSubsubcounties from './components/counties/subcounties/ShowSubCounties';
// import EditCounty from './components/counties/EditCounty';
import ApproveorDisapprove from './components/Bursary/secschools/ApproveorDisapprove';
import AddHigherlearningSchool from './components/Schools/Higherlearning/AddHigherlearningSchool';
import ShowHigherSchools from './components/Schools/Higherlearning/ShowHigherSchools';
import Application from './components/Bursary/Higher learning/Application';
import AddCategory from './components/Schools/Higherlearning/AddCategory';
import ApproveDisapprove from './components/Bursary/Higher learning/ApproveDisapprove';
import ViewApplications from './components/Bursary/Higher learning/ViewApplications';
import HigherLearningAwards from './components/Bursary/Higher learning/HigherLearningAwards';
function App() {
  console.log("logging the props in app.js page");
  const[currentUser, setCurrentUser]=useState(null);
  const[isAuthenticated, setIsAuthenticated]=useState(false);
  const [isLoading, setisLoading] = useState(true)



  const loadCurrentUser=()=>{
    getcurrentuser().then((response)=>{
      console.log("logging the load current user response ",response)
      setCurrentUser(response);
      setIsAuthenticated(true)
      setisLoading(false)
    }).catch((error)=>{
      console.log("an error has occurred while trying to load current user ",error.message);
      setisLoading(false)
    })

  }
  useEffect(() => {
    loadCurrentUser();
  }, [isAuthenticated])

  const handleLogin=()=>{
     console.log("logged in successfully")
     loadCurrentUser()
   }
  
   const handleLogout=()=>{
      const logoutoutdata={
        refreshToken:localStorage.getItem(ROUTES.REFRESH_TOKEN)
      }
      console.log("iuytfrd",logoutoutdata);

      logoutcurrentuser(logoutoutdata).then(response=>{
        console.log("logout response ",response);
      localStorage.removeItem(ROUTES.ACCESS_TOKEN,response.accessToken)
      localStorage.removeItem(ROUTES.REFRESH_TOKEN,response.refreshToken)
      localStorage.removeItem(ROUTES.TOKEN_TYPE,response.tokenType)
      localStorage.removeItem(ROUTES.USERNAMEOREMAIL,response.username)
      localStorage.removeItem(ROUTES.EXPIRESAT,response.expirationTime)
      setCurrentUser(null)
      setIsAuthenticated(false)
      loadCurrentUser();
  
  }).catch((error)=>{
      console.log("logging logout error ",error);
  })


      }

  if(isLoading){
    <LoadingIndicator/>
  }
  return (
   
   
    <Router>
      <Routes>

        <Route path={ROUTES.HOME} element={<Home/>}/>
        <Route path={ROUTES.SIGNINCOMPONENT}  element={<Signin isAuthenticated={isAuthenticated} currentUser={currentUser} onLogin={handleLogin}/>}/>        
        <Route path={ROUTES.SIGNUPCOMPONENT}  element={<Signup isAuthenticated={isAuthenticated} currentUser={currentUser} />}/>
        {/* {isAuthenticated ?  */}
          <Route path='main' element={<HomePage isAuthenticated={isAuthenticated} currentUser={currentUser} handleLogout={handleLogout}/>}>
          <Route path='apply' element={<Bursaryapplication isAuthenticated={isAuthenticated} currentUser={currentUser}/>}/>
          <Route path={ROUTES.BURSARYAPPLICATIONURLFORHIGHERLEARNING} element={<Application isAuthenticated={isAuthenticated} currentUser={currentUser}/>}/>
          <Route path={ROUTES.APPROVEDISAPPROVEHIGHERLEARNIGAPPLICATIONS} element={<ApproveDisapprove isAuthenticated={isAuthenticated} currentUser={currentUser}/>}/>
          <Route path={ROUTES.BURSARYAPPLICATIONPERIOD} element={<ApplicationPeriod isAuthenticated={isAuthenticated} currentUser={currentUser}/>}/>
          <Route path={ROUTES.VIEWAPPLICATIONPERIODSURL} element={<ViewApplicationPeriods isAuthenticated={isAuthenticated} currentUser={currentUser}/>}/>
          <Route exact path='viewapplications' element={<ViewBursaryApplications isAuthenticated={isAuthenticated} currentUser={currentUser}/>}/>
          <Route exact path={ROUTES.BURSARYAPPLICATIONSAPPROVEDISAPPROVE} element={<ApproveorDisapprove isAuthenticated={isAuthenticated} currentUser={currentUser}/>}/>
          <Route exact path={ROUTES.BURSARYAPPLICATIONSVIEWFORHIGHERLEARNING} element={<ViewApplications isAuthenticated={isAuthenticated} currentUser={currentUser}/>}/>
          <Route exact path={ROUTES.HIGHERLEARNINGBURSARYAWARDS} element={<HigherLearningAwards isAuthenticated={isAuthenticated} currentUser={currentUser}/>}/>
          <Route path='viewdetails/:bursaryapplicationId' element={<SingleDetails isAuthenticated={isAuthenticated} currentUser={currentUser} />}/>
          <Route path={ROUTES.BURSARYAPPLICATIONAWARDS} element={<BursaryAwards isAuthenticated={isAuthenticated} currentUser={currentUser}/>}/>
          <Route path={ROUTES.ADDSCHOOL} element={<AddSchool isAuthenticated={isAuthenticated} currentUser={currentUser}/>}/>
          <Route path={ROUTES.SHOWALLSCHOOLS} element={<ShowSchools isAuthenticated={isAuthenticated} currentUser={currentUser}/>}/>
          <Route path='school/edit/:schoolId' element={<EditSchool isAuthenticated={isAuthenticated} currentUser={currentUser}/>}/>
          <Route path={ROUTES.ADDHIGHERSCHOOL} element={<AddHigherlearningSchool isAuthenticated={isAuthenticated} currentUser={currentUser}/>}/>
          <Route path={ROUTES.ADDHIGHERSCHOOLCATEGORY} element={<AddCategory isAuthenticated={isAuthenticated} currentUser={currentUser}/>}/>
          <Route path={ROUTES.SHOWALLHIGHERSCHOOLS} element={<ShowHigherSchools isAuthenticated={isAuthenticated} currentUser={currentUser}/>}/>
          <Route path={ROUTES.ADDCOUNTY} element={<AddCounty isAuthenticated={isAuthenticated} currentUser={currentUser}/>}/>
          <Route path={ROUTES.SHOWALLCOUNTIES} element={<ShowCounties isAuthenticated={isAuthenticated} currentUser={currentUser}/>}/>
          {/* <Route path='county/edit/:countyId' element={<EditCounty isAuthenticated={isAuthenticated} currentUser={currentUser}/>}/> */}
          <Route  path={ROUTES.ADDSUBCOUNTY} element={<AddSubCounty isAuthenticated={isAuthenticated} currentUser={currentUser}/>}/>
          <Route path={ROUTES.SHOWALLSUBCOUNTIES} element={<ShowSubsubcounties isAuthenticated={isAuthenticated} currentUser={currentUser}/>}/>
          <Route path='subcounty/edit/:subcountyId' element={<EditSubCounty isAuthenticated={isAuthenticated} currentUser={currentUser}/>}/>
         
        </Route>
        {/* : */}
        <Route path={ROUTES.HOME} element={<Home/>}/>
     

        {/* <Route path='main/*' name='Main' element={<AdminPrivateRoutes isAuthenticated={isAuthenticated} currentUser={currentUser} />}/> */}
      </Routes>
    </Router>
  
  );
}

export default App;
