import axios from 'axios';
const url=process.env.REACT_APP_BASE_URL


export async function register(data,dispatch){
    axios.post(`http://localhost:8080/api/v1/auth/register`,data )
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