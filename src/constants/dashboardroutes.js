
import * as ROUTES from './Routes'
import Bursaryapplication from './../components/Bursary/secschools/Bursaryapplication';
import Dashboard from '../components/layouts/Dashboard';


 const dashboardroutes=[
    {path:ROUTES.MAIN,exact:true,name:'Main'},
    {path:ROUTES.MAINDASHBOARD,exact:true,name:'Dashboard',element:<Dashboard/>},

    {path:ROUTES.BURSARYAPPLICATION,exact:true,name:'Bursaryapplication',element:<Bursaryapplication/>},
    // {path:ROUTES.BURSARYAPPLICATIONSVIEW,exact:true,name:'Bursaryapplications',element:<Bursaryapplications/>}
]

export default dashboardroutes;