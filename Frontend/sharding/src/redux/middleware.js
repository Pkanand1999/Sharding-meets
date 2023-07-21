import axios from 'axios';
const url=process.env.REACT_APP_BASE_URL


export async function register(data,dispatch){
    axios.post(`${url}/register`,data )
    .then((res)=>{
      console.log(res);
        dispatch({
            type:"SIGNUP_SUCCESS",
            payload:true
        })
        alert("Registered successfully. Login Now!");
    }).catch((e)=>{
      console.log(e)
        dispatch({
            type:"SIGNUP_FAILURE",
            payload:false,
        })
    })
}

export function login(data,dispatch){
    axios.post(`${url}/login`,data )
        .then((res)=>{
            console.log(res.data)
            localStorage.setItem('chatToken',res.data.token)
            dispatch({
                type:"LOGIN_SUCCESS",
                payload:res.data
            })
        }).catch((e)=>{
          console.log(e)
            dispatch({
                type:"LOGIN_FAILURE",
                payload:true,
 
            })
        })
  }