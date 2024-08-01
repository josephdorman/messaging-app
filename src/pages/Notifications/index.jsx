import "../../styles/notifications.css";
import Sidebar from "./sidebar";
import Main from "./main";
import { useState } from "react";

function Index() {
  const [filter, setFilter] = useState("all");

  return (
    <>
      <Sidebar filter={filter} setFilter={setFilter} />
      <Main filter={filter} />
    </>
  );
}

export default Index;
