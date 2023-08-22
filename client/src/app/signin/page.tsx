'use client'
import React, {use, useEffect, useState} from 'react'
import axios,{AxiosError} from 'axios'
import { error } from 'console'
import styles from '../../styles/default.module.css'

interface signupFormData {
  firstname: string,
  lastname: string,
  username: string,
  email: string,
  password: string,
  confirmPassword: string
}

interface signinFormData {
  username: string,
  password: string,
}

const initialsignupFormData: signupFormData = {
  firstname: '',
  lastname: '',
  username: '',
  email: '',
  password: '',
  confirmPassword:'',
};

const initialsigninFormData: signinFormData = {
  username: '',
  password: '',
}

const initialbackendresponse = {
  response: '',
  status: 0,
}

const signin = () => {
  const [loginState, setLoginState] = useState(false)
  const [signUpForm, setSignUpForm] = useState<signupFormData>(initialsignupFormData)
  const [signInForm, setSignInForm] = useState<signinFormData>(initialsigninFormData)
  const [signinFormErrors, setSigninFormErrors] = useState({})
  const [signupFormErrors, setSignupFormErrors] = useState(initialsignupFormData)
  const [isSignupSubmit,setIsSignupSubmit] = useState(false)
  const [isSigninSubmit,setIsSigninSubmit] = useState(false)
  const [backendResponse, setBackendResponse] = useState(initialbackendresponse)

  const handleSignUp = (e:React.MouseEvent<HTMLButtonElement>,signUpForm:signupFormData) =>{
    e.preventDefault()
    // setSignupFormErrors(signUpValidate(signUpForm))
    signUpValidate(signUpForm)
  }

  const handleSignin = (e:React.MouseEvent<HTMLButtonElement>,signInForm:signinFormData) => {
    e.preventDefault()
    console.log(signInForm)

  }


  const signUpValidate = (values:signupFormData) => {

    const usernameregex = /^[a-zA-Z0-9_]*$/;
    const emailregex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    setSignupFormErrors(initialsignupFormData)

    if(values.firstname.length ===0){
     setSignupFormErrors(prev => ({...prev, firstname: "Firstname is required!"  }))
     setIsSignupSubmit(false)
    }else if(values.firstname.length >10){
       setSignUpForm(prev => ({...prev, firstname: "Firstname cannot be greater than 10 characters!"  }))
       setIsSignupSubmit(false)
    }

    if(values.lastname.length ===0){
     setSignupFormErrors(prev => ({...prev, lastname: "Lastname is required!"  }))
     setIsSignupSubmit(false)

    }else if(values.lastname.length >10){
      setSignupFormErrors(prev => ({...prev, lastname: "Lastname cannot be greater than 10 characters!"  }))
      setIsSignupSubmit(false)
    }

    if(values.username.length ===0){
     setSignupFormErrors(prev => ({...prev,username:"Username is required!"}))
    }else if(values.username.length >10){
      setSignupFormErrors(prev=>({...prev,username:"Username cannot be greater than 10 characters!"}))
    }else if (!usernameregex.test(values.username)) { 
    setSignupFormErrors(prev=>({...prev,username: "Username can contain only alphabets, digits and underscore!" }))
  }

  if(values.email.length===0){
    setSignupFormErrors(prev=>({...prev,email:"Email is required!"}))
  }else if(!emailregex.test(values.email)){
    setSignupFormErrors(prev=>({...prev,email:"Please enter a valid email!"}))
  }

  if(values.password.length ===0){
    setSignupFormErrors(prev=>({...prev,password:"Password is required!"}))
  }else if(values.password.length<6 && values.password.length>0){
    setSignupFormErrors(prev=>({...prev,password:"Password should be atleast 6 characters long!"}))
  }else if(values.password.length>20){
    setSignupFormErrors(prev=>({...prev,password:"Password too long!"}))
  }

  if(values.confirmPassword.length === 0 ){
    setSignupFormErrors(prev=>({...prev,confirmPassword:"Please confirm password!"}))
  }else if(values.confirmPassword != values.password){
    setSignupFormErrors(prev=>({...prev,confirmPassword:"Passwords do not match!"}))
  }
  else{
    setIsSignupSubmit(true)
  }
}
   
  const signupsubmit = async(signUpForm:signupFormData) =>{
      const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try{
  const res = await axios.post('http://localhost:5001/remotehive/api/auth/signup',JSON.stringify(signUpForm),config)
    setBackendResponse({response:res.data, status:res.status})
    setTimeout(()=>{setLoginState(true)},3000)
  }catch(error){
    setIsSignupSubmit(false)
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError; // Type assertion to AxiosError

      // Check if it's a 409 Conflict error
      if (axiosError.response?.status === 409) {
        setBackendResponse({response:axiosError.response?.data as string,status:409})
      } else {
        // Handle other errors (e.g., server error)
        console.error("Error occurred:", axiosError.message);
      }
    } else {
      // Handle other non-Axios errors
      console.error("Error occurred:", (error as Error).message);
    }
  }
  
}
  
  useEffect(()=>{
    function areAllValuesEmpty(obj: { [key: string]: any }): boolean {
      const values = Object.values(obj);
      return values.every((value) => value.length === 0)
    }
    if(areAllValuesEmpty(signupFormErrors) && isSignupSubmit){
      console.log("form submitted")
      signupsubmit(signUpForm)
      
    }
  },[isSignupSubmit])

  useEffect(()=>{
    console.log(backendResponse)
  },[backendResponse])


  return (
    <div className='font-sans min-w-[100%] min-h-[100%] flex items-center justify-center'>
      <div className={`w-[100%] md:w-[80%] h-[85%] p-[10px] md:p-[20px] lg:p-[40px]  bg-red-500 rounded-[10px] flex`}>
      <form className={`w-[100%] md:w-[50%] lg:w-[35%] ${loginState? "md:translate-x-[100%] lg:translate-x-[185%]": ""} transistion duration-500 bg-white min-h-[60%] shadow-xl rounded-[10px] p-[30px]`}>
        { !loginState && <div>
          <p className='text-[32px] text-center'>SIGNUP</p>
        <label className='flex flex-col my-[10px]' >First Name
          <input type='text' name='firstname' 
          className='border-[1px] rounded-[8px] px-[8px]' 
          value={signUpForm.firstname} 
          onChange={(e)=>{setSignUpForm(prevSignUpForm => ({...prevSignUpForm, firstname: e.target.value }))}}/>
          <p className={`${styles.formerrorfont}`}>{signupFormErrors.firstname}</p>
        </label>
        <label className='flex flex-col my-[10px]' >Second Name
          <input type='text' name='secondname' 
          className='border-[1px] rounded-[8px] px-[8px]' 
          value={signUpForm.lastname} 
          onChange={(e)=>{setSignUpForm(prevSignUpForm => ({...prevSignUpForm, lastname: e.target.value }))}}/>
           <p className={`${styles.formerrorfont}`}>{signupFormErrors.lastname}</p>
        </label>
        <label className='flex flex-col my-[10px]' >Username
          <input type='text' name='username' 
          className='border-[1px] rounded-[8px] px-[8px]' 
          value={signUpForm.username}
          onChange={(e)=>{setSignUpForm(prevSignUpForm => ({...prevSignUpForm, username: e.target.value }))}}/>
           <p className={`${styles.formerrorfont}`}>{signupFormErrors.username}</p>
        </label>
        <label className='flex flex-col my-[10px]' >Email
          <input type='text' name='email' 
          className='border-[1px] rounded-[8px] px-[8px]' 
          value={signUpForm.email}
          onChange={(e)=>{setSignUpForm(prevSignUpForm => ({...prevSignUpForm, email: e.target.value }))}}/>
           <p className={`${styles.formerrorfont}`}>{signupFormErrors.email}</p>
        </label>
        <label className='flex flex-col my-[10px]' >Password
          <input type='text' name='password' 
          className='border-[1px] rounded-[8px] px-[8px]' 
          value={signUpForm.password}
          onChange={(e)=>{setSignUpForm(prevSignUpForm => ({...prevSignUpForm, password: e.target.value }))}}/>
           <p className={`${styles.formerrorfont}`}>{signupFormErrors.password}</p>
        </label>
        <label className='flex flex-col my-[10px]' >Confirm Password
          <input type='text' name='password' 
          className='border-[1px] rounded-[8px] px-[8px]' 
          value={signUpForm.confirmPassword}
          onChange={(e)=>{setSignUpForm(prevSignUpForm => ({...prevSignUpForm, confirmPassword: e.target.value }))}}/>
           <p className={`${styles.formerrorfont}`}>{signupFormErrors.confirmPassword}</p>
        </label>
        <p className={`${backendResponse.status===409?"text-red-500":backendResponse.status===200?"text-green-500":"text-white"}`}>{backendResponse.response}</p>
        <div className='flex flex-row justify-between items-end'>
          <div onClick={()=>{setLoginState(true) 
          console.log(loginState)}} className='cursor-pointer'>Already have an account?</div>
        <button className='p-[10px] bg-blue-500 w-[100px] text-white rounded-md' onClick = {(e)=>{handleSignUp(e,signUpForm)}}>SIGN UP</button>
        </div>
 
      </div>
}
{loginState && <div>
        <div className='text-[32px] text-center font-[500]'>LOGIN</div>   
        <label className='flex flex-col my-[40px]' >Username
          <input type='text' name='username' 
          className='border-[1px] rounded-[8px] px-[8px]' 
          value={signInForm.username}
          onChange={(e)=>{setSignInForm(prev => ({...prev, username: e.target.value }))}}/>
        </label>
        
        <label className='flex flex-col my-[40px]'>Password
          <input type='text' name='password' 
          className='border-[1px] rounded-[8px] px-[8px]' 
          value={signInForm.password}
          onChange={(e)=>{setSignInForm(prev => ({...prev, password: e.target.value }))}}/>
        </label>
        <div className='flex flex-col items-center mt-[40px]'>
          
        <button className='p-[10px] bg-blue-500 w-[200px] text-white rounded-md' onClick={(e)=>handleSignin(e,signInForm)}>LOGIN</button>
        <div onClick={()=>{setLoginState(false) 
          console.log(loginState)}} className='cursor-pointer mt-[20px]'>Don't have an account?</div>
        </div>
         <div className='mt-[20px]'>
        <p className='text-center'>or</p>
        <div>Continue with google</div>
        
      </div>
      </div>}
      </form>
     
     
      </div>
    </div>
  )
}

export default signin