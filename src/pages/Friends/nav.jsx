import addImg from "../../assets/addLinear.svg";
import { Link } from "react-router-dom";

function FriendNav({ setCurrentProfile }) {
  const unFocusProfile = () => {
    console.log("test");
    setCurrentProfile(null);
  };

  return (
    <>
      <nav className="nav-friends">
        <button className="chunky">
          <Link
            onClick={unFocusProfile}
            className="no-dec"
            to="/friends/online"
          >
            Online
          </Link>
        </button>
        <button className="chunky">
          <Link
            onClick={unFocusProfile}
            className="no-dec"
            to="/friends/pending"
          >
            Pending (1)
          </Link>
        </button>
        <button className="chunky">
          <Link
            onClick={unFocusProfile}
            className="no-dec"
            to="/friends/blocked"
          >
            Blocked
          </Link>
        </button>
        <button id="add-friend" className="chunky">
          <Link onClick={unFocusProfile} className="no-dec" to="/friends/add">
            Add Friend
            <img src={addImg} className="nav-btn" alt="" />
          </Link>
        </button>
      </nav>
    </>
  );
}

export default FriendNav;
