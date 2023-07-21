import React, { useState,useEffect } from 'react';
import { register } from '../redux/middleware';
import { useDispatch ,useSelector} from "react-redux";
import { userIsLoggedIn } from '../redux/middleware';

function Signup({gotologin}) {
  const dispatch=useDispatch();
    
  const [username,setUsername]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const data=useSelector((e)=>{
    return e.reducerAuth.token
  })

  function signupuser(e){
    e.preventDefault();
    register({name:username,email:email,password:password},dispatch)
  }

  useEffect(() => {
    userIsLoggedIn(data, dispatch);
  }, [data])


  return (
    <>
      <form className='w-64 mx-auto mb-12 drop-shadow-2xl '>
            <input type="text" placeholder='UserName' className='block w-full rounded-sm p-2 mb-2 border'
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            />
            <input type="email" placeholder='Email' className='block w-full rounded-sm p-2 mb-2 border'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <input type="password" placeholder='Password' className='block w-full rounded-sm p-2 mb-2 border'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
           {email.length>5 && password.length>5 && username.length>3 && <button className='bg-blue-500 text-white block w-full rounded-sm p-2 font-bold' onClick={()=>signupuser()}>Sign Up</button>}
            <p className='text-md mt-4'>Already have an account? <span className='text-blue-600 cursor-pointer underline underline-offset-4 font-bold' onClick={()=>gotologin()}>Login</span></p>
        </form>
        </>
    
  )
}

export default Signup