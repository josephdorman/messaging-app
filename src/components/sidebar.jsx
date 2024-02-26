import profile from "../assets/profileIcon.svg";
import "../styles/sidebar.css";
import UserContext from "../providers/userContext";
import { Link } from "react-router-dom";
import { useContext } from "react";

function Sidebar(props) {
  const { user, setUser } = useContext(UserContext);

  function setSearchbar(props) {
    if (props.searchbar) {
      return "grid-4";
    }

    return "grid-3";
  }

  return (
    <>
      <div className={`sidebar ${setSearchbar(props)}`}>
        {props.body}
        <div className="ch user">
          <img className="icon-md" src={profile} alt="" />
          <div>
            <h3 className="ch-name">{user.username}</h3>
            <p className="status">Online</p>
          </div>
          <button id="settings" className="nav-btn">
            <Link to="/settings"></Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
