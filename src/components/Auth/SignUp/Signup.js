import HeaderContainer from "../../../containers/Header";
import Form from "../../Form";
import * as ROUTES from '../../../constants/Routes'

import { useState,useEffect } from "react";
import { useNavigate } from 'react-router';
import { register } from "../../../constants/ApiUtils";
export default function Signup(props) {
     const navigate=useNavigate();   
    const [error, seterror] = useState('')
   const [surname, setsurname] = useState('')
   const [firstname, setfirstname] = useState('')
   const [lastname, setlastname] = useState('')
   const [email, setemail] = useState('')
   const [username, setusername] = useState('')
   const [password, setpassword] = useState('')
    const isInvalid = surname===''|| firstname===''|| lastname==='' || email==='' || username==='' || password==='';

    useEffect(() => {
        if(!(props.isAuthenticated)){

        }else{
            navigate(ROUTES.MAINDASHBOARD)
        }
      
    }, [props.isAuthenticated])

    const registeruser=(event)=>{
        event.preventDefault();
        // alert("hgf")
        const registerdata={
            surname:surname,
            firstname:firstname,
            lastname:lastname,
            username:username,
            email:email,
            password:password
        }
        register(registerdata).then((response)=>{
            setsurname('')
            setfirstname('')
            setlastname('')
            setemail('')
            setusername('')
            setpassword('')
            console.log("logging the response after a successful registration ",response)
            navigate(ROUTES.SIGNINCOMPONENT)
        }).catch((error)=>{
           seterror(error)
            console.log("failed to register user ",error)
        })
    }
    return<>
        <HeaderContainer/>
        <Form>
            <Form.Title>Sign Up</Form.Title>
            {error && <Form.Error>{error}</Form.Error>}
            <Form.Base onSubmit={registeruser} method="POST" >
            <Form.Input 
                     type="text"
                     onChange={({target})=>setsurname(target.value)}
                    value={surname} 
                    placeholder="your surname"
                     />

                      <Form.Input 
                     type="text"
                     onChange={({target})=>setfirstname(target.value)}
                    value={firstname} 
                    placeholder="your firstname "
                     />
                      <Form.Input 
                     type="text"
                     onChange={({target})=>setlastname(target.value)}
                    value={lastname} 
                    placeholder="your lastname"
                     />
                     <Form.Input
                         type="text"
                         onChange={({target})=>setusername(target.value)}
                         value={username}
                         placeholder="your username"
                     />
                      <Form.Input
                         type="text"
                         onChange={({target})=>setemail(target.value)}
                         value={email}
                         placeholder="your email address"
                     />
                       <Form.Input 
                     type="password"
                     onChange={({target})=>setpassword(target.value)}
                    value={password} 
                    autoComplete="off"
                    placeholder="your password"
                     />
                     <Form.Submit
                      type="submit"
                      disabled={isInvalid}>Sign Up</Form.Submit>
            </Form.Base>
            <Form.Text> Already a user?  <Form.Link to={ROUTES.SIGNINCOMPONENT}>sign in now</Form.Link></Form.Text>

        </Form>
    </>
};
