import "../../styles/messages.css";
import profile from "../../assets/profileIcon.svg";
import UserContext from "../../providers/userContext";
import { getFriends } from "../../providers/api";
import Sidebar from "./sidebar";
import { useState, useEffect, useContext } from "react";

function Index() {
  /*
  const { user, setUser } = useContext(UserContext);
  const [friends, setFriends] = useState(null);

  useEffect(() => {
    getFriends();
  }, []);
  */

  return (
    <>
      <Sidebar />
    </>
  );
}

export default Index;
