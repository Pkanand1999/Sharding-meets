import { useEffect } from "react";
import Auth from "./Auth";
import Chat from "./Chat";
import { userIsLoggedIn } from "../redux/middleware";
import { useDispatch } from "react-redux";

export default function Routes() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("chatToken");

  useEffect(() => {
    userIsLoggedIn(token, dispatch);
  }, [token])

  if (token) {
    return <Chat />;
  }

  return (
    <Auth />
  );
}