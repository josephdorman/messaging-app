import MainComp from "../../components/main";
import Nav from "./nav";
import { Outlet } from "react-router-dom";

function Main({ setCurrentProfile, setNewFriend, newFriend }) {
  return (
    <>
      <MainComp
        body={
          <>
            <Nav setCurrentProfile={setCurrentProfile} />
            <Outlet context={{ setCurrentProfile, setNewFriend, newFriend }} />
          </>
        }
      />
    </>
  );
}

export default Main;
