
import Auth from "./Auth";
import Chat from "./Chat";
import {useSelector} from "react-redux";

export default function Routes() {
  const data=useSelector((e)=>{
    return e.reducerAuth.token
  })
  const token = localStorage.getItem("chatToken");

  

  if (token || data) {
    return <Chat />;
  }

  return (
    <Auth />
  );
}