import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/middleware';

function Login({gotoSignup}) {
  const dispatch=useDispatch();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    
    function loginuser(){
      login({email:email,password:password},dispatch)
    }
    
      return (
        <>
            <form className='w-64 mx-auto mb-12 drop-shadow-2xl'>
                <input type="email" placeholder='Email' className='block w-full rounded-sm p-2 mb-2 border'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
                <input type="password" placeholder='Password' className='block w-full rounded-sm p-2 mb-2 border'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
                <button isDisabled={email.length>5? false:true} className='bg-blue-500 text-white block w-full rounded-sm p-2 font-bold' onClick={loginuser}>Login</button>
                <p className='text-md mt-4'>Don't have an account? <span className='text-blue-600 cursor-pointer underline underline-offset-4 font-bold' onClick={()=>gotoSignup()}>Sign Up</span></p>
            </form>
        </>
      )
}

export default Login