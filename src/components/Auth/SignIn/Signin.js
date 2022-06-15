import HeaderContainer from "../../../containers/Header";
import Form from "../../Form";
import { useState,useEffect } from "react";
import { login } from './../../../constants/ApiUtils';
import* as ROUTES from '../../../constants/Routes'
import { useNavigate } from 'react-router';
import { Navigate } from "react-router-dom";

export default function Signin(props) {
 
    console.log("logging props inside signin page ",props);
    const navigate=useNavigate()
    const [error, setError] = useState('')
    const [usernameoremail, setUsernameOrEmail] = useState('')
    const [password, setPassword] = useState('')
    const [disabled,setDisabled]=useState(false);
    const [isigninin, setisigninin] = useState(false)
    const isInvalid = password === '' || usernameoremail === '';

    useEffect(() => {
       if(!(props.currentUser)){
       }else{
           navigate(ROUTES.MAINWITHFORWARDSLASH);
       }
    }, [props.currentUser])
    const handleSignIn=(event)=>{
        event.preventDefault();
        setDisabled(true)
        setisigninin(true)
        const loginrequest={
            usernameoremail:usernameoremail,
            password:password
        }
        
        login(loginrequest).then((response)=>{
            console.log("logging login response ",response);
            localStorage.setItem(ROUTES.ACCESS_TOKEN,response.accessToken)
            localStorage.setItem(ROUTES.REFRESH_TOKEN,response.refreshToken)
            localStorage.setItem(ROUTES.TOKEN_TYPE,response.tokenType)
            localStorage.setItem(ROUTES.USERNAMEOREMAIL,response.username)
            localStorage.setItem(ROUTES.EXPIRESAT,response.expirationTime)
             props.onLogin();
             navigate(ROUTES.MAINWITHFORWARDSLASH)
             setDisabled(false)
             setisigninin(false)
        }).catch((error)=>{
            setDisabled(false)
            setisigninin(false)

            setError(error.message);
            console.log("logging login error ",error);
        })
    }

 return(
        <>
            <HeaderContainer/>
            <Form>
                <Form.Title>Sign In</Form.Title>
                {error &&  <Form.Error>{error}</Form.Error>}
                <Form.Base onSubmit={handleSignIn} method="POST">
                    <Form.Input
                      placeholder="Your username or email address"
                      type="text"
                      value={usernameoremail}
                      onChange={({target})=>setUsernameOrEmail(target.value)}
                    />
                    <Form.Input
                        placeholder="Your password"
                        type="password"
                        value={password}
                        autoComplete="off"
                        onChange={({target})=>setPassword(target.value)}
                    />
                     {/* <Form.Submit disabled={isInvalid} disabled={disabled}  type="submit" data-testid="sign-in"> */}
                     <Form.Submit  disabled={disabled}  type="submit"  data-testid="sign-in">
                     {isigninin?<span className="spinner-grow spinner-grow-sm"></span>: 'Sign In' }
              
            </Form.Submit>
            <Form.Text>New To this Bursary application platform? <Form.Link to={ROUTES.SIGNUPCOMPONENT}>sign up</Form.Link></Form.Text>
                </Form.Base>
            </Form>
        </>
    )
    
    
};
