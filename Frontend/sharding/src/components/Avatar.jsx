import React, { useEffect,useState } from 'react'

function Avatar({online,username,userId}) {
  const [userAvatar,setUserAvatar]=useState('')
    const colors = ['bg-teal-400', 'bg-red-400',
                  'bg-green-400', 'bg-purple-400',
                  'bg-blue-400', 'bg-yellow-400',
                  'bg-orange-400', 'bg-pink-400', 'bg-fuchsia-400', 'bg-rose-400'];
  const userIdBase10 = parseInt(userId.substring(10), 16);
  const colorIndex = userIdBase10 % colors.length;
  const color = colors[colorIndex];
  useEffect(()=>{
    // let name=username;
  console.log(username)
  setUserAvatar(username[0])
  },[username,online]);
  
  return (
    <div className={"w-12 h-12 border-4 border-blue-600 relative rounded-full flex items-center "+color}>
        <span className='text-center w-full font-bold text-2xl text-green-800'>{userAvatar}</span>
        <div className={"absolute w-4 h-4 -bottom-1 -right-1 rounded-full border-2 border-white "+(online?'bg-green-500':'bg-gray-400')}></div>
    </div>
  )
}

export default Avatar