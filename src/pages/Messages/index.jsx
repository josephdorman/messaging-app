import "../../styles/messages.css";
import Sidebar from "./sidebar";
import Main from "./main";
import { useState } from "react";

function Index() {
  const [currentChannel, setCurrentChannel] = useState(null);

  return (
    <>
      <Sidebar
        currentChannel={currentChannel}
        setCurrentChannel={setCurrentChannel}
      />
      <Main
        currentChannel={currentChannel}
        setCurrentChannel={setCurrentChannel}
      />
    </>
  );
}

export default Index;
