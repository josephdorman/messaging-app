import "../../styles/friends.css";
import Sidebar from "./sidebar";
import Main from "./main";
import { useState } from "react";

function Index() {
  const [currentProfile, setCurrentProfile] = useState(null);
  const [newFriend, setNewFriend] = useState(false);

  return (
    <>
      <Sidebar
        currentProfile={currentProfile}
        setCurrentProfile={setCurrentProfile}
        newFriend={newFriend}
        setNewFriend={setNewFriend}
      />
      <Main
        setCurrentProfile={setCurrentProfile}
        newFriend={newFriend}
        setNewFriend={setNewFriend}
      />
    </>
  );
}

export default Index;
