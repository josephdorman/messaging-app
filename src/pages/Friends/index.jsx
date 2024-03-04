import "../../styles/friends.css";
import Sidebar from "./sidebar";
import Main from "./main";
import { useState } from "react";

function Index() {
  const [currentProfile, setCurrentProfile] = useState(null);

  return (
    <>
      <Sidebar
        currentProfile={currentProfile}
        setCurrentProfile={setCurrentProfile}
      />
      <Main setCurrentProfile={setCurrentProfile} />
    </>
  );
}

export default Index;
