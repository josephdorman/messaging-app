import profile from "../assets/profileIcon.svg";
import "../styles/sidebar.css";
import UserContext from "../providers/userContext";
import { useContext } from "react";

function Sidebar(props) {
  const { user, setUser } = useContext(UserContext);

  return (
    <>
      <div className="sidebar">
        {props.body}
        <div className="ch user">
          <img className="icon-md" src={profile} alt="" />
          <div>
            <h3 className="ch-name">{user.username}</h3>
            <p className="status">Online</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
