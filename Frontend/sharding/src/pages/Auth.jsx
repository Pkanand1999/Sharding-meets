import React, { useEffect, useState }  from 'react';
import Login from '../components/Login';
import Signup from '../components/Signup';

function Auth() {
    const[login,setLogin]=useState(true);
    
    
    function gotologin(){
        setLogin(true);
        console.log("login")
    }
    
    function gotoSignup(){
        setLogin(false);
    }
    


  return (
    <div className='bg-pink-100 h-screen flex items-center'>
{login ? <Login gotoSignup={gotoSignup}/>:<Signup gotologin={gotologin}/>}
    </div>
  )
}

export default Auth