import React, { useEffect,useState,useRef } from 'react'
import Avatar from '../components/Avatar';
import Logo from '../components/Logo';
import { useSelector,useDispatch } from 'react-redux';
import { userIsLoggedIn } from '../redux/middleware';
import {uniqBy} from "lodash";
import axios from 'axios'

function Chat() {
  const [ws,setWs] = useState('');
  const [onlineBuddy,setOnlineBuddy] = useState({})
  const [getuserId,setUserId] = useState(null);
  const [message,setMessage]=useState('');
  const [allMessages,setAllMessages] = useState([]);
  const divUnderMessages = useRef();
  const dispatch=useDispatch();
  const data=useSelector((e)=>{
    return e.reducerAuth.token
  })
  const id=useSelector((e)=>{
    return e.reducerAuth.id
  })
  console.log(id)

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
  const messageData=JSON.parse(event.data);
  // console.log(messageData)
  if('online' in messageData) {
    showOnlinePeople(messageData.online);
  }else if('text' in messageData) {
    // if (messageData.sender === getuserId){
      setAllMessages(prev=>([...prev, {...messageData}]));
    // }
  }
}

// fetch messages 
useEffect(()=>{
  const authToken=localStorage.getItem('chatToken');
if(getuserId){
axios.get('http://localhost:8080/messages/'+getuserId,
{headers: {
  'authorization': `Bearer ${authToken}`
}})
}
},[getuserId])

useEffect(() => {
  if(data){
    userIsLoggedIn(data, dispatch);
  }
}, [data])

function sendMessage(event){
  event.preventDefault();
  ws.send(JSON.stringify({
    
      recipient:getuserId,
      text:message,
  }))
  setMessage('');
setAllMessages(prev=>([...prev, {text:message,
sender:id,
recipient:getuserId,
}]));
}

useEffect(() => {
  const div = divUnderMessages.current;
  if (div) {
    div.scrollIntoView({behavior:'smooth', block:'end'});
  }
}, [allMessages]);

let onlinePeoplehere={...onlineBuddy}
delete onlinePeoplehere[id]
// const uniqueMessage= uniqBy(allMessages, id)

  return (
    <div className=' h-screen flex'>
      <div className='bg-green-100 w-1/3 p-4'>
        <Logo/>
        {
          Object.keys(onlinePeoplehere).map((userId) => {
            return <div onClick={()=>setUserId(userId)}
            className={"border border-blue-400 py-2 pl-4 rounded-2xl flex gap-4 items-center mb-2 cursor-pointer "+(userId===getuserId? 'bg-blue-200':'bg-pink-200') }
            key={[userId]}>
              <Avatar username={onlinePeoplehere[userId]} userId={userId}/>
              <span className='text-2xl font-bold text-teal-800'>{onlinePeoplehere[userId]}</span>
              </div>
          })
        }
      </div>
      <div className='bg-green-200 w-2/3 p-2 flex flex-col'>
        <div className='flex-grow'>
          {!getuserId ? (
          <div className=' flex h-full items-center flex-grow justify-center'>
            <div className='font-bold text-gray-400 text-2xl'> &larr; select a person</div>
          </div>) :
          (
          <div className='relative h-full'>
            <div className='overflow-y-scroll absolute inset-0'>
            {
              allMessages.map((msg,i)=>{
                return <div key={i} className={(msg.sender===id?'text-right':'text-left')}>
                  <div  className={" p-2 m-2 text-sm rounded-md "+(msg.sender===id? ' bg-blue-400 text-white font-bold inline-block':'font-bold bg-pink-400 text-gray-600 inline-block')}>{msg.text}<br/>
                sender:{msg.sender}<br/>
                my id:{id}<br/>
                </div>
                </div>
              })
            }
            <div ref={divUnderMessages}></div>
          </div>
          </div>)
          }
          </div>
          {!!getuserId && <form className='flex gap-2 mx-2' onSubmit={sendMessage}>
          <input value={message} onChange={(e)=>setMessage(e.target.value)}
          type="text" placeholder='Type your messages' className='bg-white border-2 p-2 rounded-sm flex-grow' />
          <button type="submit" className='bg-green-600 p-2 rounded-sm text-white'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
</svg>
</button>
        </form>}
        
      </div>
      </div>
  )
}

export default Chat