import MainComp from "../../components/main";
import Nav from "./nav";
import { Outlet } from "react-router-dom";

function Main({
  setCurrentProfile,
  setNewFriend,
  setCurrentPage,
  currentPage,
}) {
  return (
    <>
      <MainComp
        grid="grid-2"
        body={
          <>
            <Nav
              setCurrentProfile={setCurrentProfile}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
            <Outlet context={{ setCurrentProfile, setNewFriend }} />
          </>
        }
      />
    </>
  );
}

export default Main;
