import MainComp from "../../components/main";
import Nav from "./nav";
import { Outlet } from "react-router-dom";

function Main({ setCurrentProfile }) {
  return (
    <>
      <MainComp
        body={
          <>
            <Nav setCurrentProfile={setCurrentProfile} />
            <Outlet context={setCurrentProfile} />
          </>
        }
      />
    </>
  );
}

export default Main;
