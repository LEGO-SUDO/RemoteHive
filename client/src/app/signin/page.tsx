'use client'
import React, {useState} from 'react'

const signin = () => {
  const [loginState, setLoginState] = useState(false)
  return (
    <div className='font-sans min-w-[100%] min-h-[100%] flex items-center justify-center'>
      <div className={`w-[100%] md:w-[80%] h-[80%] p-[10px] md:p-[20px] lg:p-[40px]  bg-red-500 rounded-[10px] flex`}>
      <form className={`w-[100%] md:w-[50%] lg:w-[30%] ${loginState? "md:translate-x-[100%] lg:translate-x-[235%]": ""} transistion duration-500 bg-white min-h-[60%] shadow-xl rounded-[10px] p-[30px]`}>
        { !loginState && <div>
          <p className='text-[32px] text-center'>SIGNUP</p>
        <label className='flex flex-col my-[10px]' >First Name
          <input type='text' name='firstname' className='border-[1px] rounded-[8px] px-[8px]'/>
        </label>
        <label className='flex flex-col my-[10px]' >Second Name
          <input type='text' name='secondname' className='border-[1px] rounded-[8px] px-[8px]'/>
        </label>
        <label className='flex flex-col my-[10px]' >Username
          <input type='text' name='username' className='border-[1px] rounded-[8px] px-[8px]'/>
        </label>
        <label className='flex flex-col my-[10px]' >Email
          <input type='text' name='email' className='border-[1px] rounded-[8px] px-[8px]'/>
        </label>
        <label className='flex flex-col my-[10px]' >Password
          <input type='text' name='password' className='border-[1px] rounded-[8px] px-[8px]'/>
        </label>
        <div className='flex flex-row justify-between items-end'>
          <div onClick={()=>{setLoginState(true) 
          console.log(loginState)}} className='cursor-pointer'>Already have an account?</div>
        <button className='p-[10px] bg-blue-500 w-[100px] text-white rounded-md'>SIGN UP</button>
        </div>
         <div className='mt-[20px]'>
        <p className='text-center'>or</p>
        <div>Continue with google</div>
        
      </div>
      </div>
}
{loginState && <div>
        <div className='text-[32px] text-center font-[500]'>LOGIN</div>   
        <label className='flex flex-col my-[40px]' >Username
          <input type='text' name='username' className='border-[1px] rounded-[8px] px-[8px]'/>
        </label>
        
        <label className='flex flex-col my-[40px]' >Password
          <input type='text' name='password' className='border-[1px] rounded-[8px] px-[8px]'/>
        </label>
        <div className='flex flex-col items-center mt-[40px]'>
          
        <button className='p-[10px] bg-blue-500 w-[200px] text-white rounded-md'>LOGIN</button>
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