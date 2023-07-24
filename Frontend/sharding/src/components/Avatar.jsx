import React from 'react'

function Avatar({online,username,userId}) {
    const colors = ['bg-teal-200', 'bg-red-200',
                  'bg-green-200', 'bg-purple-200',
                  'bg-blue-200', 'bg-yellow-200',
                  'bg-orange-200', 'bg-pink-200', 'bg-fuchsia-200', 'bg-rose-200'];
  const userIdBase10 = parseInt(userId.substring(10), 16);
  const colorIndex = userIdBase10 % colors.length;
  const color = colors[colorIndex];
  username=username[0];
  return (
    <div className={"w-12 h-12 border-4 border-blue-600 relative rounded-full flex items-center "+color}>
        <span className='text-center w-full font-bold text-2xl text-green-800'>{username}</span>
        <div className={"absolute w-4 h-4 -bottom-1 -right-1 rounded-full border-2 border-white "+(online?'bg-green-500':'bg-gray-400')}></div>
    </div>
  )
}

export default Avatar