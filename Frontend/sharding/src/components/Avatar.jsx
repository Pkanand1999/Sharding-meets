import React from 'react'

function Avatar({username,userId}) {
    const colors = ['bg-teal-200', 'bg-red-200',
                  'bg-green-200', 'bg-purple-200',
                  'bg-blue-200', 'bg-yellow-200',
                  'bg-orange-200', 'bg-pink-200', 'bg-fuchsia-200', 'bg-rose-200'];
  const userIdBase10 = parseInt(userId.substring(10), 16);
  const colorIndex = userIdBase10 % colors.length;
  const color = colors[colorIndex];
  return (
    <div className={"w-12 h-12 border-4 border-gray-300 relative rounded-full flex items-center "+color}>
        <span className='text-center w-full font-bold text-2xl text-green-800'>{username[0]}</span>
        <div className='absolute w-4 h-4 -bottom-1 bg-green-600 -right-1 rounded-full border-2 border-white'></div>
    </div>
  )
}

export default Avatar