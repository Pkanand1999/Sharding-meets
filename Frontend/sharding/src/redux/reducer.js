const initialState = {
    isAuth: false,
    name:"",
    email:"",
    image:"",
    isError: false,
    isSignup:false,
    chat:[],
    time:[],
    };
    
    const reducerAuth = (state = initialState,action) => {
      switch(action.type){
          case "SIGNUP_SUCCESS":{
            return{
              ...state,
              isSignup:action.payload.token,
            }
        
          }
          case "SIGNUP_FAILURE":{
            return{
              ...state,
              isSignup:action.payload.token,
            }
        
          }
          case "LOGIN_SUCCESS":{
            return{
              ...state,
              isAuth:true,
              name:action.payload.name,
              email:action.payload.email,
              image:action.payload.image,
            }
        
          }
          case "LOGGEDIN_USER":{
            return{
              ...state,
              isAuth:true,
              name:action.payload.name,
              email:action.payload.email,
              image:action.payload.image,
            }
        
          }
          case "LOGIN_FAILURE":{
            return{
              ...state,
              isError:action.payload
            }
          }
         
          default:
          return state;
        }
    };
    
    export { reducerAuth };