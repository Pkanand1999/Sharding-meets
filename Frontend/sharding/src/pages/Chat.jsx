import React, { useEffect,useState } from 'react'

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
      <div className='bg-green-100 w-1/3 p-2'>
        {
          Object.keys(onlineBuddy).map((userId) => {
            return <div key={[userId]}>{onlineBuddy[userId]}</div>
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