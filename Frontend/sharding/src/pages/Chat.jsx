import React, { useEffect,useState,useRef } from 'react'
import Avatar from '../components/Avatar';
import Logo from '../components/Logo';
import { useSelector,useDispatch } from 'react-redux';
import { userIsLoggedIn } from '../redux/middleware';
import {uniqBy} from "lodash";
import axios from 'axios';
// import JoditEditor from 'jodit-react'

function Chat() {
  const [ws,setWs] = useState('');
  const [onlineBuddy,setOnlineBuddy] = useState({});
  const [offlinePeople,setOfflinePeople] = useState({});
  const [getuserId,setUserId] = useState();
  const [message,setMessage]=useState('');
  const [allMessages,setAllMessages] = useState([]);
  const divUnderMessages = useRef();
  // const editor=useRef(null)
  const dispatch=useDispatch();
  const isWideScreen = window.innerWidth ;
  
  const data=useSelector((e)=>{
    return e.reducerAuth.token
  })
  const id=useSelector((e)=>{
    return e.reducerAuth.id
  })
  const myname=useSelector((e)=>{
    return e.reducerAuth.name
  })
  console.log(id)

  useEffect(()=>{
      connectToWs()
  },[getuserId])
  // reconnect server ws 
  function connectToWs() {
    const ws=new WebSocket('ws://3.87.226.134:8080')
    setWs(ws);
    ws.addEventListener('message',handleMessage);
    ws.addEventListener('close' ,() => connectToWs());
  }

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
    if (messageData.sender === getuserId){
      setAllMessages(prev=>([...prev, {...messageData}]));
    }
  }
}

useEffect(()=>{
  async function fetchOfflinePeople() {
    try {
      const response = await axios.get('http://3.87.226.134:8080/api/people');
      const offlinePeopleArr = response.data;
      const offlinePeoplenow = offlinePeopleArr.filter(p => p._id !== id)
        .filter(p => !Object.keys(onlineBuddy).includes(p._id));

      const offlinePeople = {};
      offlinePeoplenow.forEach(p => {
        offlinePeople[p._id] = p.name;
      });

      setOfflinePeople(offlinePeople);
    } catch (error) {
      // Handle the error here if the API request fails
      console.log(error);
    }
  }

  if (id) {
    fetchOfflinePeople();
  }
},[onlineBuddy,id])



// fetch messages 
useEffect(()=>{
  const authToken=localStorage.getItem('chatToken');
if(getuserId){
axios.get('http://3.87.226.134:8080/api/messages/'+getuserId,
{headers: {
  'authorization': `Bearer ${authToken}`
}}).then((res)=>{
  setAllMessages(res.data);
})
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
_id:Date.now(),
}]));
}

useEffect(() => {
  const div = divUnderMessages.current;
  if (div) {
    div.scrollIntoView({behavior:'smooth', block:'end'});
  }
}, [allMessages]);

// logout functionality  
function Logout(){
  localStorage.removeItem('chatToken')
  window.location.reload(false);
}




// send file functionality 
function sendFile(){
alert('currently not working')
}


let onlinePeoplehere={...onlineBuddy}
delete onlinePeoplehere[id]
const uniqueMessage= uniqBy(allMessages, '_id')

  return (
    <div className=' h-screen flex'>
      <div className='bg-green-100 md:w-1/3 w-2/12 md:p-4 flex flex-col'>
        <div className='flex-grow'>
        <Logo/>
        {
          Object.keys(onlinePeoplehere).map((userId) => {
            return <div onClick={()=>setUserId(userId)}
            className={"border border-blue-400 py-2 pl-4 rounded-2xl flex gap-4 items-center mb-2 cursor-pointer "+(userId===getuserId? 'bg-orange-300':'bg-pink-200') }
            key={[userId]}>
              <Avatar online={true} username={onlinePeoplehere[userId]} userId={userId}/>
             {isWideScreen >470 && <span className='md:text-2xl text-sm font-bold text-teal-800'>{onlinePeoplehere[userId]}</span>}
              </div>
          })
        }
        {
          Object.keys(offlinePeople).map((userId) => {
            return <div onClick={()=>setUserId(userId)}
            className={"border border-blue-400 py-2 pl-4 rounded-2xl flex gap-4 items-center mb-2 cursor-pointer "+(userId===getuserId? 'bg-orange-300':'bg-pink-200') }
            key={[userId]}>
              <Avatar online={false} username={offlinePeople[userId]} userId={userId}/>
              {isWideScreen >470 && <span className='md:text-2xl text-sm font-bold text-teal-800'>{offlinePeople[userId]}</span>}
              </div>
          })
        }
        </div>
        <div className='flex w-full'>
          <div className='flex md:w-9/12 w-6/12 items-center gap-4'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
</svg>
{window.innerWidth> 650 && <span className='text-md font-bold text-gray-600'>{myname} &rarr;</span>}
          </div>
        <div className='bottom-0 bg-red-500 md:w-3/12 w-6/12 flex items-center justify-center p-2 rounded-md text-white font-bold cursor-pointer' onClick={Logout}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z" clipRule="evenodd" />
</svg>

        </div>
        </div>
        
      </div>
      <div className='bg-green-200 md:w-2/3 w-10/12 p-2 flex flex-col'>
        <div className='flex-grow'>
          {!getuserId ? (
          <div className=' flex h-full items-center flex-grow justify-center'>
            <div className='font-bold text-gray-400 text-2xl'> &larr; select a person</div>
          </div>) :
          (
          <div className='relative h-full'>
            <div className='overflow-y-scroll absolute inset-0'>
            {
              uniqueMessage.map((msg,i)=>{
                return <div key={i} className={(msg.sender===id?'text-right ':'text-left ')}>
                  <div  className={" p-2 m-2 text-sm rounded-md max-w-[60%] "+(msg.sender===id? ' bg-blue-500 text-white font-bold inline-block':'font-bold bg-pink-400 text-gray-600 inline-block')}>{msg.text}
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
         {/* <JoditEditor
			ref={editor}
			value={message}
			config={config}
			tabIndex={1} // tabIndex of textarea
			onBlur={newContent => setMessage(newContent)} // preferred to use only this option to update the content for performance reasons
			onChange={newContent => {setMessage(newContent)}}
		/> */}
          <label className='bg-green-900 p-2 rounded-sm text-white'>
          <input type="file" className='hidden' onChange={sendFile}/>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M18.97 3.659a2.25 2.25 0 00-3.182 0l-10.94 10.94a3.75 3.75 0 105.304 5.303l7.693-7.693a.75.75 0 011.06 1.06l-7.693 7.693a5.25 5.25 0 11-7.424-7.424l10.939-10.94a3.75 3.75 0 115.303 5.304L9.097 18.835l-.008.008-.007.007-.002.002-.003.002A2.25 2.25 0 015.91 15.66l7.81-7.81a.75.75 0 011.061 1.06l-7.81 7.81a.75.75 0 001.054 1.068L18.97 6.84a2.25 2.25 0 000-3.182z" clipRule="evenodd" />
</svg>
</label>
          <button disabled={message.length<1?true:false} type="submit" className='bg-green-600 p-2 rounded-sm text-white'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
</svg>
</button>
        </form>}
        
      </div>
      </div>
  )
}

export default Chat