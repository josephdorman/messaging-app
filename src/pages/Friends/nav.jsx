import addImg from "../../assets/addLinear.svg";
import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";

function FriendNav({ setCurrentProfile, setCurrentPage, currentPage }) {
  const oldPage = useRef(null);
  const btnRef = useRef([]);

  useEffect(() => {
    if (oldPage.current !== null) {
      btnRef.current[oldPage.current].className = "fr-nav chunky";
    }

    if (currentPage !== null) {
      btnRef.current[currentPage].className = "fr-nav fr-nav-focus chunky";
    }

    oldPage.current = currentPage;
  }, [currentPage]);

  const unFocusProfile = () => {
    setCurrentProfile(null);
  };

  return (
    <>
      <nav className="nav-friends">
        <button
          ref={(e) => (btnRef.current[0] = e)}
          onClick={() => setCurrentPage(0)}
          className="fr-nav chunky"
        >
          <Link
            onClick={unFocusProfile}
            className="no-dec"
            to="/friends/online"
          >
            Online
          </Link>
        </button>
        <button
          ref={(e) => (btnRef.current[1] = e)}
          onClick={() => setCurrentPage(1)}
          className="fr-nav chunky"
        >
          <Link
            onClick={unFocusProfile}
            className="no-dec"
            to="/friends/pending"
          >
            Pending
          </Link>
        </button>
        <button
          ref={(e) => (btnRef.current[2] = e)}
          onClick={() => setCurrentPage(2)}
          className="fr-nav chunky"
        >
          <Link
            onClick={unFocusProfile}
            className="no-dec"
            to="/friends/blocked"
          >
            Blocked
          </Link>
        </button>
        <button
          onClick={() => setCurrentPage(3)}
          ref={(e) => (btnRef.current[3] = e)}
          id="add-friend"
          className="fr-nav chunky"
        >
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
