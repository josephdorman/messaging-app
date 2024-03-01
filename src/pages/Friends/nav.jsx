import profile from "../../assets/profileIcon.svg";
import addImg from "../../assets/addLinear.svg";
import { Link } from "react-router-dom";

function FriendNav() {
  return (
    <>
      <nav className="nav-friends">
        <button className="chunky">
          <Link className="no-dec" to="/friends/online">
            Online
          </Link>
        </button>
        <button className="chunky">
          <Link className="no-dec" to="/friends/blocked">
            Blocked
          </Link>
        </button>
        <button id="add-friend" className="chunky">
          <Link className="no-dec" to="/friends/add">
            Add Friend
            <img src={addImg} className="nav-btn" alt="" />
          </Link>
        </button>
      </nav>
    </>
  );
}

export default FriendNav;
