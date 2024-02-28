import profile from "../../assets/profileIcon.svg";
import MainComp from "../../components/main";
import UserContext from "../../providers/userContext";
import { useContext } from "react";

function Main() {
  const { user, setUser } = useContext(UserContext);

  return (
    <>
      <MainComp
        body={
          <>
            <h3>My Account</h3>
            <div className="profile">
              <div className="pf-head">
                <img className="icon-lg" src={profile} alt=""></img>
                <h3>{user.username}</h3>
              </div>
              <div className="pf-sec">
                <p>DISPLAY NAME</p>
                <p>{user.username}</p>
                <button className="btn edit">Edit</button>
              </div>
              <div className="pf-sec">
                <p>EMAIL</p>
                <p>********@******</p>
                <button className="btn edit">Edit</button>
              </div>
              <div className="pf-sec">
                <p>PASSWORD</p>
                <p>********</p>
                <button className="btn edit">Edit</button>
              </div>
            </div>
          </>
        }
      />
    </>
  );
}

export default Main;
