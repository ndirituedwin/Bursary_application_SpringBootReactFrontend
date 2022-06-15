
// import { useNavigate } from 'react-router';
import { FETCHALLBURSARYAPPLICATIONSBYAPPLICATIONYEARANDMONTH, FETCHALLAPPLICATIONPERIODSYEARS, ACCESS_TOKEN, LOGINURL, CURRENTUSERURL, REGISTERURL, REFRESH_TOKEN, LOGOUTCURRENTUSER, FETCHSECSCHOOLS, APPLYFORABURSARY, FETCHALLBURSARYAPPLICATIONS, AWARDBURSARYTOSECSTUDENT, VIEWAPPLICATIONDETAISURL, FETCHALLBURSARYAPPLICATIONSBYSCHOOL, AWARDBURSARYBYSECSCHOOL, UPDATESTUDENTISAPPROVEDSTATUS, FETCHSCHOOLCATEGORIES, SAVEAPPLICATIONPERIOD, FETCHAPPLICATIONPERIODS, UPDATEAPPLICATIONPERIODISOPEN, FINDBYPARENTIDNUMBERONKEYUP, FETCHCOUNTIES, FETCHCOUNTYSUBCOUNTIES, FETCHSUBCOUNTYWARDS, FETCHOPENAPPLICATIONPERIODS, FETCHOPENAPPLICATIONPERIODYEARMONTHS, FETCHBURSARYAPPLICATIONSSBYSCHOOLCATEGORY, AWARDBURSARYBYSECSCHOOLCATEGORY, FETCHBURSARYAWARDS, FETCHBURSARYAWARDSBYSECSCHOOL, FETCHBURSARYAWARDSBYSECSCHOOLCATEGORY, FETCHALLAPPLICATIONPERIODYEARMONTHS, FILTERAWARDTABLEBYAPPLICATIONPERIODYEAR, FILTERAWARDTABLEBYAPPLICATIONPERIODYEARANDMONTH, SAVESECONDARYSCHOOL, FETCHSCHOOLTYPES, FETCHSECSCHOOLBYID, CHECKFOROPENAPPLICATIONPERIOD, AWARDBURSARY, SIGNINCOMPONENT, AWARDBURSARYASIDIVIDUAL, FETCHSECSCHOOLSTUDENTS, FETCHBURSARYAWARDSBYSECSCHOOLStudentId, SAVECOUNTY, SAVESUBCOUNTY, FETCHSUBCOUNTYBYID, UPDATESUBCOUNTY, FETCHALLSUBCOUNTIES, UPDATESTUDENTISAPPROVEDSTATUSARRAY, FETCHALLBURSARYAPPLICATIONSTOUPDATE, EXISTSBYSTUDENTADMNOANDSCHOOL, FETCHOPENAPPLICATIONPERIOD, FETCHHIGHERLEARNINGCATEGORIES, SAVEHIGHERLEARNING, FETCHALLHIGHERLEARNINGS, HIGHERLEARNINGAPPLYFORABURSARY, SAVEHIGHERLEARNINGCATEGORY, HIGHERLEARNINGEXISTSBYSTUDENTADMNOANDSCHOOL, FETCHALLHIGHERLEARNINGBURSARYAPPLICATIONS, UPDATEHIGHERSTUDENTISAPPROVEDSTATUSARRAY, UPDATEHIGHERSTUDENTISAPPROVEDSTATUS, FETCHALLBURSARYAPPLICATIONSFORHIGHERSCHOOLS, FETCHALLHIGHERLEARNINGBURSARYAPPLICATIONSBYAPPLICATIONYEARANDMONTH, FETCHHIGHERLEARNINGBURSARYAPPLICATIONSSBYSCHOOLCATEGORY, FETCHALLHIGHERBURSARYAPPLICATIONSBYSCHOOL, FETCHHIGHERLEARNINGSCHOOLS, HIGHERLEARNINGAWARDBURSARY, AWARDBURSARYASIDIVIDUALFORHIGHERLEARNING, FETCHBURSARYAWARDSHIGHERLEARNING, FETCHSECSCHOOLSTUDENTSHIGHERLEARNING, FILTERAWARDTABLEBYAPPLICATIONPERIODYEARHIGHERLEARNING, FILTERAWARDTABLEBYAPPLICATIONPERIODYEARANDMONTHHIGHERLEARNING, FETCHHIGHERBURSARYAWARDSBYSECSCHOOLCATEGORY, FETCHHIGHERBURSARYAWARDSBYSCHOOL, FETCHHIGHERBURSARYAWARDSBYSCHOOLStudentId } from './Routes';
import { Navigate } from 'react-router-dom';
import { FETCHALLCOUNTIES } from './Routes';
// const navigate = useNavigate();

const request=(options)=>{
        const headers=new Headers({
        'Content-type':'application/json'

    });
    if(localStorage.getItem(ACCESS_TOKEN)){
        headers.append('Authorization','Bearer '+localStorage.getItem(ACCESS_TOKEN))
    }
    const defaults={headers:headers};
    options=Object.assign({},defaults,options);
    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            console.log("the response that is  okay ",response)
            if(!response.ok) {
                if(response.status===401){
                    console.log("the response that is not okay ",response)
                    alert("redirecting to login page")
                    Navigate(SIGNINCOMPONENT)
                }
                return Promise.reject(json);
            }
            return json;
        })
    );
}
export function login(loginRequest){
    return request({
        url:LOGINURL,
        method:'POST',
        body:JSON.stringify(loginRequest)
    })
}
export function register(registerrequest){
    return request({
        url:REGISTERURL,
        method:'POST',
        body:JSON.stringify(registerrequest)
    })
}
export function getcurrentuser(){
    if(!localStorage.getItem(ACCESS_TOKEN)){
        return Promise.reject("No access token set!");
    }
    return request({
        url:CURRENTUSERURL,
        method:'GET'
    })
}
export function logoutcurrentuser(token){

    if(!localStorage.getItem(REFRESH_TOKEN)){
        return Promise.reject("refresh token not set")
    }
    return request({
        url:LOGOUTCURRENTUSER,
        method:'POST',
        body:JSON.stringify(token)
    });


    
}

/**saving schools and getting them */
export function savesecondaryschool(token){

    if(!localStorage.getItem(REFRESH_TOKEN)){
        return Promise.reject("refresh token not set")
    }
    return request({
        url:SAVESECONDARYSCHOOL,
        method:'POST',
        body:JSON.stringify(token)
    });  
}
export function fetchschooltypes(){
    if(!localStorage.getItem(ACCESS_TOKEN)){
        return Promise.reject("you are unauthenticated!")
    }
    return request({
        url:FETCHSCHOOLTYPES,
        method:'GET'
    })
 }
export function fetchsecschoolById(data){
    if(!localStorage.getItem(ACCESS_TOKEN)){
        return Promise.reject("you are unauthenticated!")
    }
    return request({
        url:FETCHSECSCHOOLBYID,
        method:'POST',
        body:JSON.stringify(data)
    })
 }
/**end */


//enter application period
export function  checkforopenapplicationperiods(applicationperiodrequest){
    if(!localStorage.getItem(ACCESS_TOKEN)){
        return Promise.reject("You are not authenticated");
    }
    return request({
        url:CHECKFOROPENAPPLICATIONPERIOD,
        method:'POST',
        body:JSON.stringify(applicationperiodrequest)
    })

}
export function  saveapplicationperiod(applicationperiodrequest){
    if(!localStorage.getItem(ACCESS_TOKEN)){
        return Promise.reject("You are not authenticated");
    }
    return request({
        url:SAVEAPPLICATIONPERIOD,
        method:'POST',
        body:JSON.stringify(applicationperiodrequest)
    })

}
    //fethapplicationperiods
    export function viewapplicationperiods(){
        if(!localStorage.getItem(ACCESS_TOKEN)){
            return Promise.reject("you are unauthenticated!")
        }
        return request({
            url:FETCHAPPLICATIONPERIODS,
            method:'GET'
        })
     }

     //openapplicationperiods
     export function fetchallopenapplicationperiods(){
        if(!localStorage.getItem(ACCESS_TOKEN)){
            return Promise.reject("you are unauthenticated!")
        }
        return request({
            url:FETCHOPENAPPLICATIONPERIODS,
            method:'GET'
        })
     }
     export function openapplicationperiod(){
        if(!localStorage.getItem(ACCESS_TOKEN)){
            return Promise.reject("you are unauthenticated!")
        }
        return request({
            url:FETCHOPENAPPLICATIONPERIOD,
            method:'GET'
        })
     }
     export function fetchappliationperiodyearmonths(data){
        if(!localStorage.getItem(ACCESS_TOKEN)){
            return Promise.reject("you are unauthenticated!")
        }
        return request({
            url:FETCHOPENAPPLICATIONPERIODYEARMONTHS,
            method:'POST',
            body:JSON.stringify(data)
        })  
     }
     
    export function updateapplicationeriodisopen(updatestatus){
        if(!localStorage.getItem(ACCESS_TOKEN)){
            return Promise.reject("you are unauthenticated!")
        }
        return request({
            url:UPDATEAPPLICATIONPERIODISOPEN,
            method:'PUT',
            body:JSON.stringify(updatestatus)
        })
     }
     


    //bursarysecschoos
    export function fetchsecschools(){
       if(!localStorage.getItem(ACCESS_TOKEN)){
           return Promise.reject("you are unauthenticated!")
       }
       return request({
           url:FETCHSECSCHOOLS,
           method:'GET'
       })
    }
    export function fetchsecstudents(){
        if(!localStorage.getItem(ACCESS_TOKEN)){
            return Promise.reject("you are unauthenticated!")
        }
        return request({
            url:FETCHSECSCHOOLSTUDENTS,
            method:'GET'
        })
     }
    
    //fetchschoolcategories
    export function fetchschoolcategories(){
        if (!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject('You are not authenticated');
        }
        return request({
            url:FETCHSCHOOLCATEGORIES,
            method:'GET'
        })
    }
    //fetch counties

    export function fetchcounties(){
        if (!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject('You are not authenticated');
        }
        return request({
            url:FETCHCOUNTIES,
            method:'GET'
        })
    }
    //fetch county subcounties
    
    export function fetchcountysubcounties(data){
        if (!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject('You are not authenticated');
        }
        return request({
            url:FETCHCOUNTYSUBCOUNTIES,
            method:'POST',
            body:JSON.stringify(data)
        })
    }
 //fetch subcountywards
 export function fetchsubcountywards(data){
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject('You are not authenticated');
    }
    return request({
        url:FETCHSUBCOUNTYWARDS,
        method:'POST',
        body:JSON.stringify(data)
    })
}



    export function findbyparentidnumberonchange(data){
        if (!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject('You are not authenticated')
        }
        return request({
            url:FINDBYPARENTIDNUMBERONKEYUP,
            method:'POST',
            body:JSON.stringify(data)
        })
    }
    
    export function doesstudentexistswithadmnoandschool(data){
        if (!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject('You are not authenticated')
        }
        return request({
            url:EXISTSBYSTUDENTADMNOANDSCHOOL,
            method:'POST',
            body:JSON.stringify(data)
        })
    }

    export function applybursary(secbursaryrequest){
        if(!localStorage.getItem(ACCESS_TOKEN)){
            return Promise.reject("You are not authenticated")
        }
        return request({
            url:APPLYFORABURSARY,
            method:'POST',
            body:JSON.stringify(secbursaryrequest)
        })
       
    }
  export  function  updatestudentisapprovedstatus(updateisapproved){
    if(!localStorage.getItem(ACCESS_TOKEN)){
        return Promise.reject("You are not authenticated")
    }
    return request({
        url:UPDATESTUDENTISAPPROVEDSTATUS,
        method:'put',
        body:JSON.stringify(updateisapproved)
    })
  }
  export  function approvedisapprovearray(data){
    if(!localStorage.getItem(ACCESS_TOKEN)){
        return Promise.reject("You are not authenticated")
    }
    return request({
        url:UPDATESTUDENTISAPPROVEDSTATUSARRAY,
        method:'put',
        body:JSON.stringify(data)
    })
  }



    
    export function bursaryapplications(){
        if(!localStorage.getItem(ACCESS_TOKEN)){
            return Promise.reject("You ain't authenticated ");
        }
        return request({
            url:FETCHALLBURSARYAPPLICATIONS,
            method:'GET'
        })
    }
    export function getbursaryapplicationstoupate(){
        if(!localStorage.getItem(ACCESS_TOKEN)){
            return Promise.reject("You ain't authenticated ");
        }
        return request({
            url:FETCHALLBURSARYAPPLICATIONSTOUPDATE,
            method:'GET'
        })
    }
    
    
    export function bursaryapplicationsbyapplicationyearandmonth(data){
        if(!localStorage.getItem(ACCESS_TOKEN)){
            return Promise.reject("You ain't authenticated ");
        }
        return request({
            url:FETCHALLBURSARYAPPLICATIONSBYAPPLICATIONYEARANDMONTH,
            method:'POST',
            body:JSON.stringify(data)
        })
    }
    export function fetchbursaryapplicationsbyschool(schoolId){
        if(!localStorage.getItem(ACCESS_TOKEN)){
            return Promise.reject("You ain't authenticated")

        }
        return request({
            url:FETCHALLBURSARYAPPLICATIONSBYSCHOOL+schoolId,
            method:'GET'
        })
    }

    export function awardbursary(awardbursaryrequest){
        if(!localStorage.getItem(ACCESS_TOKEN)){
            return Promise.reject("You ain't authenticated");
        }
        return request({
            url:AWARDBURSARYTOSECSTUDENT,
            method:'POST',
            body:JSON.stringify(awardbursaryrequest)
        })
    }
    export function awardbursaryrequest(awardbursaryrequest){
        if(!localStorage.getItem(ACCESS_TOKEN)){
            return Promise.reject("You ain't authenticated");
        }
        return request({
            url:AWARDBURSARY,
            method:'POST',
            body:JSON.stringify(awardbursaryrequest)
            // body:awardbursaryrequest
        })
    }
    export function awardbursaryrequestasindividual(awardbursaryrequest){
        if(!localStorage.getItem(ACCESS_TOKEN)){
            return Promise.reject("You ain't authenticated");
        }
        return request({
            url:AWARDBURSARYASIDIVIDUAL,
            method:'POST',
            body:awardbursaryrequest
            // body:JSON.stringify(awardbursaryrequest)
        })
    }


    export function awardbursarybysecschool(awardbursaryrequest){
        if(!localStorage.getItem(ACCESS_TOKEN)){
            return Promise.reject("You ain't authenticated");
        }
        return request({
            url:AWARDBURSARYBYSECSCHOOL,
            method:'POST',
            body:JSON.stringify(awardbursaryrequest)
        })
    }
    export function awardbursarybyschoolcategory(awardbursaryrequest){
        if(!localStorage.getItem(ACCESS_TOKEN)){
            return Promise.reject("You ain't authenticated");
        }
        return request({
            url:AWARDBURSARYBYSECSCHOOLCATEGORY,
            method:'POST',
            body:JSON.stringify(awardbursaryrequest)
        })
    }
    export function fetchbursaryapplicationsbyschoolcategory(schoolcategoryid){
        if(!localStorage.getItem(ACCESS_TOKEN)){
            return Promise.reject('You are not authenticated')
        }
        return request({
            url:FETCHBURSARYAPPLICATIONSSBYSCHOOLCATEGORY+schoolcategoryid,
            method:'GET'
        })
    }
    export function viewdetails(applicationId){
        if(!localStorage.getItem(ACCESS_TOKEN)){
            return Promise.reject("You ain't authenticated ");
        }
        return request({
            url:VIEWAPPLICATIONDETAISURL+applicationId,
            method:'GET'
        })
    }
    export function fetchbursaryawards(){
         if(!localStorage.getItem(ACCESS_TOKEN)){
             return Promise.reject("You ain't authenticated");
         }
         return request({
             url:FETCHBURSARYAWARDS,
             method:'GET',
         })
    }

    export function fetchbursaryawardsbysekschool(data){
        if(!localStorage.getItem(ACCESS_TOKEN)){
            return Promise.reject("You ain't authenticated");
        }
        return request({
            url:FETCHBURSARYAWARDSBYSECSCHOOL,
            method:'POST',
            body:JSON.stringify(data)
        })
}
export function fetchbursaryawardsbysecschoolstudent(data){
    if(!localStorage.getItem(ACCESS_TOKEN)){
        return Promise.reject("You ain't authenticated");
    }
    return request({
        url:FETCHBURSARYAWARDSBYSECSCHOOLStudentId,
        method:'POST',
        body:JSON.stringify(data)
    })
}

export function fetchbursaryawardsbysekschoolcategory(data){
    if(!localStorage.getItem(ACCESS_TOKEN)){
        return Promise.reject("You ain't authenticated");
    }
    return request({
        url:FETCHBURSARYAWARDSBYSECSCHOOLCATEGORY,
        method:'POST',
        body:JSON.stringify(data)
    })
}
// fetchallapplicationperiods
export function fetchallapplicationperiodsyears(){
   if(!localStorage.getItem(ACCESS_TOKEN)){
       return Promise.reject("you are unauthenticated!")
   }
   return request({
       url:FETCHALLAPPLICATIONPERIODSYEARS,
       method:'GET'
   })
}
export function fetchallapplicationperiodyearmonths(data){
    if(!localStorage.getItem(ACCESS_TOKEN)){
        return Promise.reject("you are unauthenticated!")
    }
    return request({
        url:FETCHALLAPPLICATIONPERIODYEARMONTHS,
        method:'POST',
        body:JSON.stringify(data)
    })  
 }
 export function filterawardtablebyappplicationyearr(data){
    if(!localStorage.getItem(ACCESS_TOKEN)){
        return Promise.reject("you are unauthenticated!")
    }
    return request({
        url:FILTERAWARDTABLEBYAPPLICATIONPERIODYEAR,
        method:'POST',
        body:JSON.stringify(data)
    })  
 }
 export function filterawardtablebyappplicationyearrandmonth(data){
    if(!localStorage.getItem(ACCESS_TOKEN)){
        return Promise.reject("you are unauthenticated!")
    }
    return request({
        url:FILTERAWARDTABLEBYAPPLICATIONPERIODYEARANDMONTH,
        method:'POST',
        body:JSON.stringify(data)
    })  
 }
 /**county */
 export function savecounty(data){
    if(!localStorage.getItem(ACCESS_TOKEN)){
        return Promise.reject("you are unauthenticated!")
    }
    return request({
        url:SAVECOUNTY,
        method:'POST',
        body:JSON.stringify(data)
    })  
 }
 export function fetchallcountiess(){
    if(!localStorage.getItem(ACCESS_TOKEN)){
        return Promise.reject("you are unauthenticated!")
    }
    return request({
        url:FETCHALLCOUNTIES,
        method:'GET'
    })
 }
 export function savesubcounty(data){
    if(!localStorage.getItem(ACCESS_TOKEN)){
        return Promise.reject("you are unauthenticated!")
    }
    return request({
        url:SAVESUBCOUNTY,
        method:'POST',
        body:JSON.stringify(data)
    })  
 }
 export function fetchallsubcountiess(){
    if(!localStorage.getItem(ACCESS_TOKEN)){
        return Promise.reject("you are unauthenticated!")
    }
    return request({
        url:FETCHALLSUBCOUNTIES,
        method:'GET'
    })
 }
 export function fetchsubcountybyidd(subcountyId){
    if(!localStorage.getItem(ACCESS_TOKEN)){
        return Promise.reject("You ain't authenticated ");
    }
    return request({
        url:FETCHSUBCOUNTYBYID+subcountyId,
        method:'GET'
    })
}

export function updatesubcounty(updatesubcounty){
    if(!localStorage.getItem(ACCESS_TOKEN)){
        return Promise.reject("you are unauthenticated!")
    }
    return request({
        url:UPDATESUBCOUNTY,
        method:'PUT',
        body:JSON.stringify(updatesubcounty)
    })
 }
 
 /** end of counties */
 /** Higher learning */
 export function fetchhigherlearningcategories(){
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject('You are not authenticated');
    }
    return request({
        url:FETCHHIGHERLEARNINGCATEGORIES,
        method:'GET'
    })
}
export function savehigherlearning(data){
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject('You are not authenticated');
    }
    return request({
        url:SAVEHIGHERLEARNING,
        method:'POST',
        body:JSON.stringify(data)
    })
}
export function savehigherlearningcategory(data){
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject('You are not authenticated');
    }
    return request({
        url:SAVEHIGHERLEARNINGCATEGORY,
        method:'POST',
        body:JSON.stringify(data)
    })
}
export function fetchallhigherschools(){
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject('You are not authenticated');
    }
    return request({
        url:FETCHALLHIGHERLEARNINGS,
        method:'GET'
    })
}
export function higherlearningapplybursary(higherlearnigbursaryrequest){
    if(!localStorage.getItem(ACCESS_TOKEN)){
        return Promise.reject("You are not authenticated")
    }
    return request({
        url:HIGHERLEARNINGAPPLYFORABURSARY,
        method:'POST',
        body:JSON.stringify(higherlearnigbursaryrequest)
    })
   
}
export function doeshigherlearningstudentexistswithadmnoandschool(data){
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject('You are not authenticated')
    }
    return request({
        url:HIGHERLEARNINGEXISTSBYSTUDENTADMNOANDSCHOOL,
        method:'POST',
        body:JSON.stringify(data)
    })
}
export function gethighereducationbursaryapplicationstoupate(){
    if(!localStorage.getItem(ACCESS_TOKEN)){
        return Promise.reject("You ain't authenticated ");
    }
    return request({
        url:FETCHALLHIGHERLEARNINGBURSARYAPPLICATIONS,
        method:'GET'
    })
}
export  function  updatehigherstudentisapprovedstatus(updateisapproved){
    if(!localStorage.getItem(ACCESS_TOKEN)){
        return Promise.reject("You are not authenticated")
    }
    return request({
        url:UPDATEHIGHERSTUDENTISAPPROVEDSTATUS,
        method:'put',
        body:JSON.stringify(updateisapproved)
    })
  }
  export  function higherlearningapprovedisapprovearray(data){
    if(!localStorage.getItem(ACCESS_TOKEN)){
        return Promise.reject("You are not authenticated")
    }
    return request({
        url:UPDATEHIGHERSTUDENTISAPPROVEDSTATUSARRAY,
        method:'put',
        body:JSON.stringify(data)
    })
  }

  export function bursaryapplicationsforhigherlearning(){
    if(!localStorage.getItem(ACCESS_TOKEN)){
        return Promise.reject("You ain't authenticated ");
    }
    return request({
        url:FETCHALLBURSARYAPPLICATIONSFORHIGHERSCHOOLS,
        method:'GET'
    })
}
export function higherlearningbursaryapplicationsbyapplicationyearandmonth(data){
    if(!localStorage.getItem(ACCESS_TOKEN)){
        return Promise.reject("You ain't authenticated ");
    }
    return request({
        url:FETCHALLHIGHERLEARNINGBURSARYAPPLICATIONSBYAPPLICATIONYEARANDMONTH,
        method:'POST',
        body:JSON.stringify(data)
    })
}
export function fetchhigherlearningbursaryapplicationsbyschoolcategory(schoolcategoryid){
    if(!localStorage.getItem(ACCESS_TOKEN)){
        return Promise.reject('You are not authenticated')
    }
    return request({
        url:FETCHHIGHERLEARNINGBURSARYAPPLICATIONSSBYSCHOOLCATEGORY+schoolcategoryid,
        method:'GET'
    })
}
export function fetchhigherbursaryapplicationsbyschool(schoolId){
    if(!localStorage.getItem(ACCESS_TOKEN)){
        return Promise.reject("You ain't authenticated")

    }
    return request({
        url:FETCHALLHIGHERBURSARYAPPLICATIONSBYSCHOOL+schoolId,
        method:'GET'
    })
}
export function higherlearningawardbursaryrequest(awardbursaryrequest){
    if(!localStorage.getItem(ACCESS_TOKEN)){
        return Promise.reject("You ain't authenticated");
    }
    return request({
        url: HIGHERLEARNINGAWARDBURSARY,
        method:'POST',
        body:JSON.stringify(awardbursaryrequest)
        // body:awardbursaryrequest
    })
}
export function higherlearningawardbursaryrequestasindividual(awardbursaryrequest){
    if(!localStorage.getItem(ACCESS_TOKEN)){
        return Promise.reject("You ain't authenticated");
    }
    return request({
        url:AWARDBURSARYASIDIVIDUALFORHIGHERLEARNING,
        method:'POST',
        body:awardbursaryrequest
    })
}
export function fetchhigherlearningbursaryawards(){
    if(!localStorage.getItem(ACCESS_TOKEN)){
        return Promise.reject("You ain't authenticated");
    }
    return request({
        url:FETCHBURSARYAWARDSHIGHERLEARNING,
        method:'GET',
    })
}
export function fetchhigherlearningsecstudents(){
    if(!localStorage.getItem(ACCESS_TOKEN)){
        return Promise.reject("you are unauthenticated!")
    }
    return request({
        url:FETCHSECSCHOOLSTUDENTSHIGHERLEARNING,
        method:'GET'
    })
 }
 export function filterhigherawardtablebyappplicationyearr(data){
    if(!localStorage.getItem(ACCESS_TOKEN)){
        return Promise.reject("you are unauthenticated!")
    }
    return request({
        url:FILTERAWARDTABLEBYAPPLICATIONPERIODYEARHIGHERLEARNING,
        method:'POST',
        body:JSON.stringify(data)
    })  
 }
 export function filterhigherawardtablebyappplicationyearrandmonth(data){
    if(!localStorage.getItem(ACCESS_TOKEN)){
        return Promise.reject("you are unauthenticated!")
    }
    return request({
        url:FILTERAWARDTABLEBYAPPLICATIONPERIODYEARANDMONTHHIGHERLEARNING,
        method:'POST',
        body:JSON.stringify(data)
    })  
 }
 export function fetchhigherbursaryawardsbysekschoolcategory(data){
    if(!localStorage.getItem(ACCESS_TOKEN)){
        return Promise.reject("You ain't authenticated");
    }
    return request({
        url:FETCHHIGHERBURSARYAWARDSBYSECSCHOOLCATEGORY,
        method:'POST',
        body:JSON.stringify(data)
    })
}
export function fetchbursaryawardsbyhigherschool(data){
    if(!localStorage.getItem(ACCESS_TOKEN)){
        return Promise.reject("You ain't authenticated");
    }
    return request({
        url:FETCHHIGHERBURSARYAWARDSBYSCHOOL,
        method:'POST',
        body:JSON.stringify(data)
    })
}
export function fetchhigherbursaryawardsbysecschoolstudent(data){
    if(!localStorage.getItem(ACCESS_TOKEN)){
        return Promise.reject("You ain't authenticated");
    }
    return request({
        url:FETCHHIGHERBURSARYAWARDSBYSCHOOLStudentId,
        method:'POST',
        body:JSON.stringify(data)
    })
}

 /** end of Higher Learning */