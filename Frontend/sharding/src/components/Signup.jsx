import React, { useState } from 'react'


function Signup({gotologin}) {
    
  const [username,setUsername]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

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
            <button className='bg-blue-500 text-white block w-full rounded-sm p-2 font-bold'>Sign Up</button>
            <p className='text-md mt-4'>Already have an account? <span className='text-blue-600 cursor-pointer underline underline-offset-4 font-bold' onClick={()=>gotologin()}>Login</span></p>
        </form>
        </>
    
  )
}

export default Signup