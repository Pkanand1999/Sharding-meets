import Auth from "./Auth";
import Chat from "./Chat";

export default function Routes() {
  const  token= localStorage.getItem("chatToken");

  if (token) {
    return <Chat />;
  }

  return (
    <Auth />
  );
}