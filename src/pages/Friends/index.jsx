import "../../styles/friends.css";
import Sidebar from "./sidebar";
import Main from "./main";
import { useState } from "react";

function Index() {
  const [currentProfile, setCurrentProfile] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);
  const [newFriend, setNewFriend] = useState(false);

  return (
    <>
      <Sidebar
        currentProfile={currentProfile}
        setCurrentProfile={setCurrentProfile}
        setCurrentPage={setCurrentPage}
        newFriend={newFriend}
        setNewFriend={setNewFriend}
      />
      <Main
        setCurrentProfile={setCurrentProfile}
        setNewFriend={setNewFriend}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  );
}

export default Index;
