import React, { useState } from 'react'

function Signup() {
const [username,setUsername]=useState('');
const [password,setPassword]=useState('');


  return (
    <div className='bg-green-100 h-screen flex items-center'>
        <form className='w-64 mx-auto mb-12'>
            <input type="text" placeholder='UserName' className='block w-full rounded-sm p-2 mb-2 border'
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            />
            <input type="password" placeholder='Password' className='block w-full rounded-sm p-2 mb-2 border'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
            <button className='bg-blue-500 text-white block w-full rounded-sm p-2'>Sign Up</button>
        </form>
    </div>
  )
}

export default Signup