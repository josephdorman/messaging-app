import MainComp from "../../components/main";
import Nav from "./nav";
import { Outlet } from "react-router-dom";

function Main() {
  return (
    <>
      <MainComp
        body={
          <>
            <Nav />
            <Outlet />
          </>
        }
      />
    </>
  );
}

export default Main;
