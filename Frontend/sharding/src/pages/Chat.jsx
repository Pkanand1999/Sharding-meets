import React, { useEffect,useState } from 'react'
import Avatar from '../components/Avatar';

function Chat() {
  const [ws,setWs] = useState('');
  const [onlineBuddy,setOnlineBuddy] = useState({})
 const token=localStorage.getItem('chatToken');
  useEffect(()=>{
 const ws=new WebSocket('ws://localhost:8080')
 setWs(ws);
 ws.addEventListener('message',handleMessage);
  },[])

  function showOnlinePeople(people){
    const peopleObj={}
    people.forEach(({userId,username})=>{
       peopleObj[userId]=username
    })
    setOnlineBuddy(peopleObj);
  }

function handleMessage(event) {
  const msgData=JSON.parse(event.data);
  // console.log(msgData)
  if('online' in msgData) {
    showOnlinePeople(msgData.online);
  }
}

  return (
    <div className=' h-screen flex'>
      <div className='bg-green-100 w-1/3 p-4'>
        <div className='text-green-800 font-bold flex gap-2 bg-blue-200 mb-4 p-2'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M5.337 21.718a6.707 6.707 0 01-.533-.074.75.75 0 01-.44-1.223 3.73 3.73 0 00.814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 01-4.246.997z" clipRule="evenodd" />
</svg>
Online Buddies</div>
        {
          Object.keys(onlineBuddy).map((userId) => {
            return <div className='border border-blue-400 py-2 flex gap-4 items-center' key={[userId]}>
              <Avatar/>
              <span>{onlineBuddy[userId]}</span>
              </div>
          })
        }
      </div>
      <div className='bg-green-200 w-2/3 p-2 flex flex-col'>
        <div className='flex-grow'>messages</div>
        <div className='flex gap-2 mx-2'>
          <input type="text" placeholder='Type your messages' className='bg-white border-2 p-2 rounded-sm flex-grow' />
          <button className='bg-green-600 p-2 rounded-sm text-white'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
</svg>
</button>
        </div>
      </div>
      </div>
  )
}

export default Chat