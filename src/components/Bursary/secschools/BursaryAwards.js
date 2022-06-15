import React, { Component, Fragment } from 'react'
import {fetchbursaryawardsbysecschoolstudent,fetchsecstudents, fetchallapplicationperiodyearmonths, fetchschoolcategories, fetchallapplicationperiodsyears, fetchbursaryawards, fetchsecschools, fetchbursaryawardsbysekschool, fetchbursaryawardsbysekschoolcategory, filterawardtablebyappplicationyearr, filterawardtablebyappplicationyearrandmonth } from './../../../constants/ApiUtils';
//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 
import jsPDF from  "jspdf";
import "jspdf-autotable";
import { Link } from 'react-router-dom';
import Select from 'react-select';


export default class BursaryAwards extends Component {
    constructor(props) {
        super(props)
        this.state = {
          theselectedvalue:null,
            isOpen:false,
             awards:[],
             loadingawards:true, 
             loadingawardserror:null,
             secondaryschools:[],
            secschoolstudents:[],
            issecschoolstudentloading:true,
            secondaryschoolstudentsserror:null,
             secondaryschoolserror:null,
             issecondaryschoolsloading:true,
             schoolcategories:[],
             isschoolcatloading:true,
             applicationperiods:[],
             isapplicationperiodsloading:true,
             applicationperiodserror:null,
             applicationperiodsyearmonths:[],
             isapplicationyearmonthsloading:true,  
             applicationperiodyear:''      
        }
       this.filterawardtablebyappplicationyear=this.filterawardtablebyappplicationyear.bind(this);
        this.fetchawardsbyyearandmont=this.fetchawardsbyyearandmonth.bind(this);
        this.fetchallapplicationperiodsyears=this.fetchallapplicationperiodsyears.bind(this);
        this.fetchawardsbyschool=this.fetchawardsbyschool.bind(this)
        this.fetchawardsbystudent=this.fetchawardsbystudent.bind(this)
        this.fetchbursaryawardsall=this.fetchbursaryawardsall.bind(this);
        this.fetchschoolcategoriesall=this.fetchschoolcategoriesall.bind(this);
        this.handleInput=this.handleInput.bind(this);
        this.onapplicationperiodyearchange=this.onapplicationperiodyearchange.bind(this);
        this.generatePdf=this.generatePdf.bind(this);
      }
     

    async fetchallapplicationperiodsyears(){
      try {
        const resp = await fetchallapplicationperiodsyears();
        if (resp) {
          this.setState({
            applicationperiods: resp,
            isapplicationperiodsloading: false
          });
          console.log("logging openapplicationperiods", resp);
        }
      } catch (exception) {
        this.setState({
          applicationperiodserror: exception,
          isapplicationperiodsloading: false
        });
        console.log("logging error ", exception);
      }

    }

    async fetchschoolcategoriesall(){
      try {
        const resp = await fetchschoolcategories();
        this.setState({
          schoolcategories: resp,
          isschoolcatloading: false
        });
        console.log("this is the response ", resp);
      } catch (error) {
        this.setState({
          isschoolcatloading: false
        });
        console.log("an error has occurred while fetching school categories ", error);
      }
    }
   
     async fetchsecondaryschools(){
      try {
         const response = await fetchsecschools();
         if (response) {
           this.setState({
             secondaryschools: response,
             issecondaryschoolsloading: false
           });

         }
         console.log("response", response);
       } catch (exception) {
         console.log("error ", exception);
         this.setState({
           secondaryschoolserror: exception,
           issecondaryschoolsloading: false
         });
       }
    }

    handleInput=(e)=>{
      e.preventDefault();

      this.setState({[e.target.name]:e.target.value});
    }
    filterawardtablebyappplicationyear(data){
      this.setState({
        awards:[],
        loadingawards:true, 
      })
      if(data.year==0){
        this.fetchbursaryawardsall();
        return
      }
      filterawardtablebyappplicationyearr(data).then((resp)=>{
        if(resp){
          this.setState({
            awards:resp,
            loadingawards:false, 
          })
        }
      }).catch((error)=>{
        this.setState({
          awards:this.fetchbursaryawardsall(),
          loadingawards:false, 
             loadingawardserror:error,
        })
      })
        
    }
    onapplicationperiodyearchange=(e)=>{
      e.preventDefault();
      this.setState({
        theselectedvalue:`ApplicationYear: ${e.target.value}`,
        applicationperiodsyearmonths:[],
        isapplicationyearmonthsloading:true,
        awards:[],
      })
      const data={
        year:e.target.value
      }
      this.filterawardtablebyappplicationyear(data)
      



      console.log(data.year)
      fetchallapplicationperiodyearmonths(data).then(resp=>{
        if(resp){
          this.setState({
            applicationperiodsyearmonths:resp,
            isapplicationyearmonthsloading:false

          })
          console.log("applicationperiodyear this is the response ",resp)
        }
      }).catch(error=>{
        this.setState({
          isapplicationyearmonthsloading:false
        })  
              console.log("error ",error);
      })
    }

    componentDidMount(){
      
      this.fetchallapplicationperiodsyears();
      this.fetchsecondaryschools();
      this.fetchschoolcategoriesall();
      this.fetchbursaryawardsall();
      this.fetchallsecstudents();
      $(document).ready(function () {
        $('#example').DataTable();
      });
       
    }
    componentDidUpdate(prevProps,prevState,snapshot){
      $(document).ready(function () {
        $('#example').DataTable();
      });
      // this.fetchbursaryawardsall();
      //  if(prevState.awards.length !=)
    }
    async fetchallsecstudents(e){
      try {
        const response = await fetchsecstudents();
        if (response) {
          this.setState({
            secschoolstudents: response?.content,
            issecschoolstudentloading: false
          });

        }
        console.log("secondarschoolstudentresponse", response);
      } catch (exception) {
        console.log("error ", exception);
        this.setState({
          secondaryschoolstudentsserror: exception,
          issecschoolstudentloading: false
        });
      }
    }
    fetchawardsbyyearandmonth(e){
      e.preventDefault();
      this.setState({
        awards:[],
        loadingawards:true, 
        theselectedvalue:`ApplicationYear: ${this.state.applicationperiodyear} and ApplicationMonth: ${e.target.value}`,

        // schoolcategories:[],
        // secondaryschools:[],
        
      })
      const data={
        month:e.target.value,
        year:this.state.applicationperiodyear
      }
      console.log("data ",data);
      // return
      filterawardtablebyappplicationyearrandmonth(data).then((resp)=>{
        if(resp){
          this.setState({
            awards:resp,
            loadingawards:false, 
          })
        }
      }).catch((error)=>{
        this.setState({
          awards:this.fetchbursaryawardsall(),
          loadingawards:false, 
             loadingawardserror:error,
        })
      }) 
    }
    async fetchbursaryawardsall(){
      try {
        const resp = await fetchbursaryawards();
        if (resp) {
          this.setState({ awards: resp, loadingawards: false });
          $(document).ready(function () {
            $('#example').DataTable();
          });
        }
        console.log("theresponse ", resp);
      } catch (error) {
        this.setState({
          loadingawardserror: error,
          loadingawards: false
        });
      }
    }

    // fetchawardsbyschool=(event)=>{
    fetchawardsbyschool=(selectedOption)=>{
      // event.preventDefault();
      console.log(`Option selected selectedOption:`, selectedOption);
      const schoolId=selectedOption.value;
      const data={schoolId:Number(schoolId)}
          if (data.schoolId===0) {
           this.fetchbursaryawardsall();
             return;  
      }
        this.setState({
        awards:[],
        loadingawards:true,
        theselectedvalue:`Secondary School: ${selectedOption.label}`,

      })
    
      fetchbursaryawardsbysekschool(data).then((response)=>{
        if(response){
          this.setState({
            awards:response,
            loadingwards:false
          })
        }
        console.log("fffffff",response)
        }).catch((error)=>{
          this.setState({
            loadingawardserror:error,
            awards:this.fetchbursaryawardsall(),
            loadingwards:false
          })
         })
   }
   //fetchbyschoolcategory
   fetchawardsbyschoolcategory=(event)=>{
    event.preventDefault();
    const schoolCategoryId=event.currentTarget.value.split(':')[0];
    const data={schoolCategoryId:Number(schoolCategoryId)}
       if (data.schoolCategoryId===0) {
         this.fetchbursaryawardsall();
           return;  
    }
    this.setState({
      awards:[],
      loadingawards:true,
      theselectedvalue:`School Category: ${event.target.value.split(':')[1]}`,

     
    })
    fetchbursaryawardsbysekschoolcategory(data).then((response)=>{
      if(response){
        this.setState({
          awards:response,
          loadingwards:false
        })
      }
      console.log("fffffff",response)
      }).catch((error)=>{
        this.setState({
          loadingawardserror:error,
          awards:this.fetchbursaryawardsall(),
          loadingwards:false
        })
       })

    
  }
  fetchawardsbystudent=(selectedOption)=>{
    // event.preventDefault()
    const studentId=selectedOption.value;
    const data={studentId:Number(studentId)}
       if (data.studentId===0) {
         this.fetchbursaryawardsall();
           return;  
    }
    this.setState({
      awards:[],
      loadingawards:true,
      theselectedvalue:`Student: ${selectedOption.label}`,
      // theselectedvalue:event.target.value.split(':')[1],

     
    })
    fetchbursaryawardsbysecschoolstudent(data).then((response)=>{
      if(response){
        
        // console.log("theresponseby secschoolstudent",response)
        
        this.setState({
          awards:response,
          loadingwards:false
        })
      }
      }).catch((error)=>{
        this.setState({
          loadingawardserror:error,
          awards:this.fetchbursaryawardsall(),
          loadingwards:false
        })
       })

  }
   
   generatePdf=(e)=>{
 this.jspdfautotableone()
     
  }

  jspdfautotableone=()=>{
    var pdf = new jsPDF('l', 'pt', 'a4');
    var res = pdf.autoTableHtmlToJson(document.getElementById("example"), false); 
    res.columns.splice(7,7)
    
    if(this.state.theselectedvalue===null|| this.state.theselectedvalue===''|| this.state.theselectedvalue===undefined){

      var y = 20;
      // doc.setLineWidth(2);
      pdf.text(200, y = y + 30, "All Secondary schools Bursary awards.");
    }else{

      var y = 20;
      pdf.text(200, y = y + 30, `Secondary schools bursary awards: \n `);
      pdf.text(200, y = y + 30, `${this.state.theselectedvalue} `);
    }
    // return
    pdf.autoTable(res.columns, res.data, {
    // startY: 60,
    startY: 90,
    tableWidth: 'auto',
    columnWidth: 'auto',
    styles: {
      overflow: 'linebreak',
      marginTop:'20px',
      // fillColor: [239, 154, 154],
      marginLeft:'25px'
    }
  });
 
  pdf.save("pdfExample.pdf");
      
  }
 
  toggleOpen = () => {
    this.setState(state => ({ isOpen: !state.isOpen }));
  };
 

    render() {  

      
      
      // let options = this.state.cities.map(function (city) {
      //   return { value: city.countryCode, label: city.name };
      // })

      
      let allapplicationperiodyear
       if(this.state.isapplicationperiodsloading){
          allapplicationperiodyear=<option>Please wait...</option>
       }else{
         if(!this.state.applicationperiods.length>0){
          allapplicationperiodyear=<option>No data available</option>
        }else{
           allapplicationperiodyear=this.state.applicationperiods?.map((openperiod,idx)=>{
             return <><option key={idx} value={openperiod}>{openperiod}</option></>
           })
           
         }
       }
       let allapplicationyearmonths
       if (this.state.isapplicationyearmonthsloading) {
         allapplicationyearmonths=<option>Please wait....</option>
       }else{
         if (!this.state.applicationperiodsyearmonths.length>0) {
          allapplicationyearmonths=<option>No data available</option>
         }else{
          allapplicationyearmonths=this.state.applicationperiodsyearmonths.map((month,idx)=>{
            return <><option key={idx} value={month.month}>{month.month}</option></>
          })
         }
         
       }




      let secschoolscategories;
      if(this.state.isschoolcatloading){
          secschoolscategories=<option>Loading....</option>
      }else{
          if (this.state.schoolcategories.length>0) {
              secschoolscategories=this.state.schoolcategories.map((category,idx)=>{
                  return<><option key={category.id} value={category.id+':'+category.category}>{category.category}</option></>
              })
              
          }
      }
      let secschoolstudents
      if(this.state.issecschoolstudentloading){
        // secschoolstudents=<option>Loading....</option>
    }else{
        if (this.state.secschoolstudents?.length>0) {
          /* secschoolstudents=this.state.secschoolstudents.map((student,idx)=>{
                 return<><option key={student.id} value={student.id+':'+student.admissionnumber}>{student.admissionnumber}--{student.fullname}</option></>
             })*/
            secschoolstudents=this?.state?.secschoolstudents?.map(function (student) {
              return { value: student.id, label: student.fullname+'--'+student.admissionnumber };
            })
        }
    }
      let secschools;
      if(this.state.issecondaryschoolsloading){
        // secschools=<option>Loading...</option>
        // return { value: loading, label: pleasewait };
      }else{
        if(this.state.secondaryschools?.content.length>0){
            /*  secschools=this.state.secondaryschools?.content.map((school,idx)=>{
                return<><option key={school?.id} value={school?.id+':'+school?.school} >{school?.school}--{school?.county?.county}</option></>
              })*/
             
            secschools=this?.state?.secondaryschools?.content?.map(function (school) {
              return { value: school.id, label: school.school+'--'+school?.county?.county};
            })
            
            }
      }
        let allbursaryawards;
        let studentswithchools;
        let grandtotal=0;
        if (this.state.loadingawards) {
            allbursaryawards=<img src="/images/misc/loading.gif" alt="Loading..." />       
        }
        if(this.state.awards?.content?.length>0){
          const reducing=this.state.awards.content.reduce((group,student)=>{
             if(this.state.theselectedvalue ===''|| this.state.theselectedvalue ===null || this.state.theselectedvalue ===undefined){
              const {secondarySchool}=student
              group[secondarySchool]=group[secondarySchool] ?? [];
               group[secondarySchool].push(student)
              }else{ 
                const {secondarySchool}=student
              group[secondarySchool]=group[secondarySchool] ?? [];
               group[secondarySchool].push(student)                        
               /* const theselectedvalue=student[this.state.theselectedvalue]
                 console.log("the selected value",theselectedvalue)
                group[this.state.theselectedvalue]=group[this.state.theselectedvalue] ?? [];
                group[this.state.theselectedvalue].push(student)*/
                

             }
           
            return group;
          },{})
          allbursaryawards=Object.entries(reducing).map((data)=>{
            let amount=0;
              studentswithchools=data[1].map((appl,idx)=>{
                  amount+=appl.amount;
                  grandtotal+=appl.amount
              return <>

                 <tr key={idx}>
                 <td>{appl?.fullname}</td>
                 <td>{appl?.admno}</td>
                 <td>{appl?.formorclass}</td>
                 <td>{appl?.secondarySchool.slice(0,10)}</td>
                 <td>{appl?.applicationYear}</td>
                 <td>{appl?.applicationMonth}</td>
                 <td style={{ color:"green" }}>{appl?.amount}</td>
                 <td>{appl?.secondaryschoolcategory}</td>
                 <td>{appl?.schoollocation}--{appl?.schoollocationcountycode}</td>
                 <td>{appl?.studentParentname}</td>
                 <td>{appl?.studentParentidnumber}</td>
                 <td>{appl?.studentParentphonenumber}</td>
                 <td>{appl?.studentparentcounty}--{appl?.studentparentcountycode}</td>
                 <td>{appl?.studentparentward}</td>
               </tr>

              </>
                }) 
             return <>
                <tr>
                <td colSpan={14}  style={{ backgroundColor:"greenyellow" }}>{data[0]}</td>
              </tr>
              {studentswithchools}
              <tr>
              <td colSpan={6}>SubTotal</td>
                <td>{amount}</td>
              </tr>
             
             </>            
           }) 
              
           
          }else{
              allbursaryawards=<tr>
              <td ></td>        
                <td colSpan={2} ><span style={{ color:"red" }} >No data available</span></td>
              </tr>
          }
        return (
            <Fragment>
                <div className="content-wrapper">

<section className="content-header">
  <div className="container-fluid">
    <div className="row mb-2">
      <div className="col-sm-6">
        <h1>Bursary awards</h1>
      </div>
      <div className="col-sm-6">
        <ol className="breadcrumb float-sm-right">
          <li className="breadcrumb-item"><a href="#">Home</a></li>
          <li className="breadcrumb-item active">Bursary awards</li>
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
          {/* <div className="col-md-10">{this?.state?.serverresponse && <span className="help-block text-danger card-title">{(this?.state?.serverresponse?.message? this?.state?.serverresponse?.message:this?.state?.serverresponse?.body?.message)}</span> }</div> */}
          <div className="col-md-2">              </div>
        </div> 
                </div>
                </div>
                </div>
                </section>
<section className="content" >
  <div className="container-fluid" >
  <div className="row" >
  <div className="col-12" >
  <div className="card" style={{ width:"100%" ,overflowX:"scroll",overflow:"scroll",overflowY:"scroll"}}>
          <div className="card-header">
            <div className="row">
                    <div className="col-md-3">
                      <div className="form-group">
                      <label htmlFor="applicationYear" className="control-label"> appication year</label>
                       <select name="applicationperiodyear" id="" className='form-control' onChange={(e) => { this.handleInput(e); this.onapplicationperiodyearchange(e) }} value={this.state?.applicationperiodyear} >
                          <option value="0">Select application year</option>
                          {allapplicationperiodyear}
                        </select> 
                       
                          <span className="help-block text-danger"></span>
                      </div>       
                    </div> 

                    <div className="col-md-3">
                      <div className="form-group">
                      <label htmlFor="applicationMonth" className="control-label"> appication month</label>
                      <select name="applicationMonth" className= 'form-control' onChange={(event)=>this.fetchawardsbyyearandmonth(event)} width="auto" >
                          <option value="0">Select application month</option>
                          {allapplicationyearmonths}
                        </select>
                          <span className="help-block text-danger"></span>
                      </div>       
                    </div> 

                    <div className="col-md-3">
                      <div className="form-group">
                      <label htmlFor="schoolcategory" className="control-label"> school category</label>
                      <select name="schoolcategory" className= 'form-control' onChange={(event)=>this.fetchawardsbyschoolcategory(event)} width="auto" >
                          <option value="0">Select school category</option>
                          {secschoolscategories}
                        </select>
                          <span className="help-block text-danger"></span>

                      </div>       
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                      <label htmlFor="schoolcategory" className="control-label"> Students</label>
                      {/* <select name="schoolstudent" className= 'form-control' onChange={(event)=>this.fetchawardsbystudent(event)} width="auto" >
                          <option value="0">Select sec student</option>
                          {secschoolstudents}
                        </select> */}
                        <Select 
                            placeholder="Type to search"
                            name="schoolstudent"
                            options = {secschoolstudents}
                            onChange={this.fetchawardsbystudent}
                            autoFocus={true}
                        /> 
                          <span className="help-block text-danger"></span>

                      </div>       
                    </div>


                    <div className="col-md-3">
                      <div className="form-group">
                      <label htmlFor="schoolId" className="control-label"> schools</label>
                      {/* <select name="secondarySchool" className= 'form-control' onChange={(event)=>this.fetchawardsbyschool(event)} width="auto" >
                          <option value="0">Select school </option>
                          {secschools}
                        </select> */}
                        <Select 
                            placeholder="Type to search"
                            name="secondarySchool"
                            options = {secschools}
                            onChange={this.fetchawardsbyschool}
                            autoFocus={true}
                        /> 

                        
                          <span className="help-block text-danger"></span>

                      </div>       
                    </div>                     
            </div>
          </div>
          <div className="card-body" >
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-2">
            <Link className="btn btn-primary"  to="" onClick={(e)=>this.generatePdf(e)} >Generate pdf</Link>
            </div>
          </div>
            <table id="example"  className="table table-bordered table-hover">               
              <thead>

              <tr >

                <th>fullname</th>
                <th>Admno</th>
                <th>Formorclass</th>
                <th>School</th>                            
                <th>Appl-Year</th>
                <th>Appl-Month</th>
                <th>Amount</th>
                <th>Schoolcategory</th>
                <th>Schlocation--code</th>
                <th>Parentname</th>
                <th>Parentidnumber</th>
                <th>Parentphonenumber</th>
                <th>Parentcounty--code</th>
                <th>Parentward</th>

              </tr>
              </thead>
              <tbody>
           {allbursaryawards}
           <tr>
           <td colSpan={6}>GrandTotal</td>
           <td>{grandtotal}</td>

           </tr> 
           </tbody>
              <tfoot>
              <tr >
              <th>fullname</th>
                <th>Admno</th>
                <th>Formorclass</th>
                <th>School</th>                            
                <th>Appl-Year</th>
                <th>Appl-Month</th>
                <th>Amount</th>
                <th>Schoolcategory</th>
                <th>Schlocation--code</th>
                <th>Parentname</th>
                <th>Parentidnumber</th>
                <th>Parentphonenumber</th>
                <th>Parentcounty--code</th>
                <th>Parentward</th>
              </tr>
              </tfoot>
            </table>
          </div>
        
        </div>
       
      </div>
      
    </div>
  
  </div>

</section>

</div>
            </Fragment>
            
        )
    }
}

