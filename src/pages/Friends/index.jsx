import "../../styles/friends.css";
import Sidebar from "./sidebar";
import Main from "./main";
import { useState } from "react";

function Index() {
  const [friends, setFriends] = useState();

  return (
    <>
      <Sidebar friends={friends} setFriends={setFriends} />
      <Main />
    </>
  );
}

export default Index;
