export const ROOTURL=`http://localhost:8080/api`
export const HOME='/'
export const DASHBOARD='/dashboard'
export const BROWSE='/browse'

/**auth */
export const REGISTERURL=ROOTURL+`/auth/register`
export const LOGINURL=ROOTURL+`/auth/signin`
export const CURRENTUSERURL=ROOTURL+`/users/currentuser/`
export const LOGOUTCURRENTUSER=ROOTURL+`/auth/logout`
export const UPDATESTUDENTISAPPROVEDSTATUS=ROOTURL+"/bursary/secondaryschools/approveordisaprove/"
export const UPDATESTUDENTISAPPROVEDSTATUSARRAY=ROOTURL+"/bursary/secondaryschools/approveordisaprovearray/"



/**end auth */

/**save school */
export const SAVESECONDARYSCHOOL=ROOTURL+`/bursary/secondaryschools/save`
export const FETCHSCHOOLTYPES=ROOTURL+`/bursary/type/fetchtypes`
export const FETCHSECSCHOOLBYID=ROOTURL+`/bursary/secondaryschools/fetchsecschoolbyid`

/**end */
/** higher Learning */

export const FETCHHIGHERLEARNINGCATEGORIES=ROOTURL+`/bursary/highereducation/getall`
export const SAVEHIGHERLEARNING=ROOTURL+`/bursary/highereducation/save`
export const SAVEHIGHERLEARNINGCATEGORY=ROOTURL+`/bursary/highereducationcategory/save`
export const FETCHALLHIGHERLEARNINGS=ROOTURL+`/bursary/highereducation/fetchallhigherlearningschools`
export const HIGHERLEARNINGAPPLYFORABURSARY=ROOTURL+`/bursary/highereducation/savehigheeducationbursaryapplication`
export const HIGHERLEARNINGEXISTSBYSTUDENTADMNOANDSCHOOL=ROOTURL+`/bursary/highereducation/checkbyhigherstudentadmnoandschool`
export const FETCHALLHIGHERLEARNINGBURSARYAPPLICATIONS=ROOTURL+`/bursary/highereducation/getbursaryapplicationstoupate`
export const UPDATEHIGHERSTUDENTISAPPROVEDSTATUS=ROOTURL+"/bursary/highereducation/approveordisaprove/"
export const UPDATEHIGHERSTUDENTISAPPROVEDSTATUSARRAY=ROOTURL+"/bursary/highereducation/approveordisaprovearray/"

export const FETCHALLBURSARYAPPLICATIONSFORHIGHERSCHOOLS=ROOTURL+`/bursary/highereducation/viewapplications`

export const FETCHALLHIGHERLEARNINGBURSARYAPPLICATIONSBYAPPLICATIONYEARANDMONTH=ROOTURL+`/bursary/highereducation/viewapplicationsbyapplicationyearandmonth`
export const FETCHHIGHERLEARNINGBURSARYAPPLICATIONSSBYSCHOOLCATEGORY=ROOTURL+`/bursary/highereducation/fetchsbursaryapplicationssbyschoolcategory/`
export const FETCHALLHIGHERBURSARYAPPLICATIONSBYSCHOOL=ROOTURL+`/bursary/highereducation/viewapplicationsbyschoolid/`
export const HIGHERLEARNINGAWARDBURSARY=ROOTURL+`/bursary/highereducation/awardbursary`
export const AWARDBURSARYASIDIVIDUALFORHIGHERLEARNING=ROOTURL+`/bursary/highereducation/awardbursaryasindividuall`
export const FETCHBURSARYAWARDSHIGHERLEARNING=ROOTURL+`/bursary/highereducation/fetchbursaryawards`
export const FETCHSECSCHOOLSTUDENTSHIGHERLEARNING=ROOTURL+`/bursary/highereducation/getsecondaryschoolstudents`
export const FILTERAWARDTABLEBYAPPLICATIONPERIODYEARHIGHERLEARNING=ROOTURL+`/bursary/highereducation/fetchawardsbyapplicationperiodyear/viewall`
export const FILTERAWARDTABLEBYAPPLICATIONPERIODYEARANDMONTHHIGHERLEARNING=ROOTURL+`/bursary/highereducation/fetchawardsbyapplicationperiodyearandmonth/viewall`
export const FETCHHIGHERBURSARYAWARDSBYSECSCHOOLCATEGORY=ROOTURL+`/bursary/highereducation/fetchbursaryawardsbysecschoolcategory`
export const FETCHHIGHERBURSARYAWARDSBYSCHOOL=ROOTURL+`/bursary/highereducation/fetchbursaryawardsbysecschool`
export const FETCHHIGHERBURSARYAWARDSBYSCHOOLStudentId=ROOTURL+`/bursary/highereducation/fetchbursaryawardsbysecschoolstudentId`
/** end  */

/**bursary  applications SEC*/

export const SAVEAPPLICATIONPERIOD=ROOTURL+`/applicationperiod/save`
export const CHECKFOROPENAPPLICATIONPERIOD=ROOTURL+`/applicationperiod/checkisopen`
export const UPDATEAPPLICATIONPERIODISOPEN=ROOTURL+`/applicationperiod/updateisopen`
export const FETCHAPPLICATIONPERIODS=ROOTURL+`/applicationperiod/viewall`
export const FETCHOPENAPPLICATIONPERIODS=ROOTURL+`/applicationperiod/openapplicationperiods/viewall`
export const FETCHOPENAPPLICATIONPERIOD=ROOTURL+`/applicationperiod/openapplicationperiod/fetch`
export const FETCHALLAPPLICATIONPERIODSYEARS=ROOTURL+`/applicationperiod/applicationperiodsyears/viewall`
export const FETCHOPENAPPLICATIONPERIODYEARMONTHS=ROOTURL+`/applicationperiod/fetchappliationperiodyearmonths/viewall`
export const FETCHALLAPPLICATIONPERIODYEARMONTHS=ROOTURL+`/applicationperiod/fetchallappliationperiodyearmonths/viewall`
export const FETCHSECSCHOOLS=ROOTURL+`/bursary/secondaryschools/getschools`
export const FETCHSECSCHOOLSTUDENTS=ROOTURL+`/bursary/secondaryschools/getsecondaryschoolstudents`
export const FINDBYPARENTIDNUMBERONKEYUP=ROOTURL+`/bursary/secondaryschools/checkparentonkeyup`
export const EXISTSBYSTUDENTADMNOANDSCHOOL=ROOTURL+`/bursary/secondaryschools/checkbystudentadmnoandschool`
export const FETCHCOUNTIES=ROOTURL+`/county/viewall`
export const FETCHCOUNTYSUBCOUNTIES=ROOTURL+`/county/fetchcountysubcounties`
export const FETCHSUBCOUNTYWARDS=ROOTURL+`/county/fetchsubcountywards`
export const APPLYFORABURSARY=ROOTURL+`/bursary/secondaryschools/applyforabursary`
export const FETCHALLBURSARYAPPLICATIONS=ROOTURL+`/bursary/secondaryschools/viewapplications`
export const FETCHALLBURSARYAPPLICATIONSTOUPDATE=ROOTURL+`/bursary/secondaryschools/getbursaryapplicationstoupate`
export const FETCHALLBURSARYAPPLICATIONSBYAPPLICATIONYEARANDMONTH=ROOTURL+`/bursary/secondaryschools/viewapplicationsbyapplicationyearandmonth`
export const FETCHALLBURSARYAPPLICATIONSBYSCHOOL=ROOTURL+`/bursary/secondaryschools/viewapplicationsbyschoolid/`
export const AWARDBURSARYTOSECSTUDENT=ROOTURL+`/bursary/secondaryschools/awardbursaryasindividual`
export const AWARDBURSARY=ROOTURL+`/bursary/secondaryschools/awardbursary`
export const AWARDBURSARYASIDIVIDUAL=ROOTURL+`/bursary/secondaryschools/awardbursaryasindividuall`
export const AWARDBURSARYBYSECSCHOOL=ROOTURL+`/bursary/secondaryschools/awardbursarybyschool`
export const AWARDBURSARYBYSECSCHOOLCATEGORY=ROOTURL+`/bursary/secondaryschools/awardbursarybyschool`
export const VIEWAPPLICATIONDETAISURL=ROOTURL+`/bursary/secondaryschools/viewdetails/`
export const FETCHSCHOOLCATEGORIES=ROOTURL+`/bursary/secondaryschools/fetchschoolcategories`
export const FETCHBURSARYAWARDS=ROOTURL+`/bursary/secondaryschools/fetchbursaryawards`
export const FETCHBURSARYAWARDSBYSECSCHOOL=ROOTURL+`/bursary/secondaryschools/fetchbursaryawardsbysecschool`
export const FETCHBURSARYAWARDSBYSECSCHOOLStudentId=ROOTURL+`/bursary/secondaryschools/fetchbursaryawardsbysecschoolstudentId`
export const FETCHBURSARYAWARDSBYSECSCHOOLCATEGORY=ROOTURL+`/bursary/secondaryschools/fetchbursaryawardsbysecschoolcategory`
export const FILTERAWARDTABLEBYAPPLICATIONPERIODYEAR=ROOTURL+`/bursary/secondaryschools/fetchawardsbyapplicationperiodyear/viewall`
export const FILTERAWARDTABLEBYAPPLICATIONPERIODYEARANDMONTH=ROOTURL+`/bursary/secondaryschools/fetchawardsbyapplicationperiodyearandmonth/viewall`
export const FETCHBURSARYAPPLICATIONSSBYSCHOOLCATEGORY=ROOTURL+`/bursary/secondaryschools/fetchsbursaryapplicationssbyschoolcategory/`
export const SHOWBURSARYDETAILSPAGE=`/main/viewdetails/`
/**end bursary applications */

/**savecounty */
export const SAVECOUNTY=ROOTURL+`/county/save`
export const FETCHALLCOUNTIES=ROOTURL+`/county/viewall`
export const SAVESUBCOUNTY=ROOTURL+`/subcounty/save`
export const FETCHALLSUBCOUNTIES=ROOTURL+`/subcounty/viewall`
export const FETCHSUBCOUNTYBYID=ROOTURL+`/subcounty/byid/fetch/`
export const UPDATESUBCOUNTY=ROOTURL+`/subcounty/update/`


/**end of county section */
export const SIGNINCOMPONENT="/signin"
export const SIGNUPCOMPONENT="signup"

export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';
export const TOKEN_TYPE = 'tokenType';
export const USERNAMEOREMAIL = 'usernameorEmail';
export const EXPIRESAT = 'expiresAt';
export const AUTHUSER = 'authUser';

//Bursary
export const MAIN='main'
export const MAINWITHFORWARDSLASH='/main'

export const MAINDASHBOARD='/dashboard';
export const BURSARYAPPLICATION='apply'

export const VIEWAPPLICATIONPERIODSURL='/main/viewapplicationperiods'

export const BURSARYAPPLICATIONPERIOD='/main/applicationperiod' 
export const BURSARYAPPLICATIONURL='/main/apply'
export const BURSARYAPPLICATIONSVIEW='viewapplications'
export const BURSARYAPPLICATIONSVIEWURL='/main/viewapplications'
export const BURSARYAPPLICATIONSAPPROVEDISAPPROVE='/main/viewapplications/approvedisapprove'
export const BURSARYAPPLICATIONAWARDS='/main/viewapplications/allawards';
//APPLICATIONS BY SCHOOL CATEGORY
// export const APPLICATIONBYSCHOOLCATEGORYURL='/main/applicationsby_secschool_category'
//Higher learning schools
export const BURSARYAPPLICATIONURLFORHIGHERLEARNING='/main/higherlearning/apply'
export const APPROVEDISAPPROVEHIGHERLEARNIGAPPLICATIONS='/main/higherlearning/updatestatus'
export const BURSARYAPPLICATIONSVIEWFORHIGHERLEARNING='/main/higherlearning/viewapplications'
export const HIGHERLEARNINGBURSARYAWARDS='/main/higherlearning/awards'

//show  higher shools
export const SHOWALLHIGHERSCHOOLS='/main/schools/higher/showall'
export const ADDHIGHERSCHOOL='/main/schools/higher/addschool'
export const ADDHIGHERSCHOOLCATEGORY='/main/schools/higher/addschoolcategory'

//show shools
export const SHOWALLSCHOOLS='/main/schools/showall'
export const ADDSCHOOL='/main/schools/add'
export const EDITSCHOOL=`/main/school/edit/`

//show counties
export const SHOWALLCOUNTIES='/main/counties/showall'
export const ADDCOUNTY='/main/counties/add'
export const EDITCOUNTY=`/main/county/edit/`
export const ADDSUBCOUNTY=`/main/subcounty/add`
export const SHOWALLSUBCOUNTIES='/main/subcounty/showall'
export const EDITSUBCOUNTY=`/main/subcounty/edit/`



