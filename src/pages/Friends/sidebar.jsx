import SidebarComp from "../../components/sidebar";
import profile from "../../assets/profileIcon.svg";
import { getFriends } from "../../providers/api";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

function Sidebar({
  currentProfile,
  setCurrentProfile,
  newFriend,
  setNewFriend,
}) {
  const [friends, setFriends] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const oldProfile = useRef(null);
  const btnRef = useRef([]);

  useEffect(() => {
    getFriends().then((res) => {
      setFriends(res);

      if (res !== false) {
        setIsLoading(false);
      } else {
        setIsError(true);
      }
    });
    setNewFriend(false);
  }, [newFriend]);

  useEffect(() => {
    if (oldProfile.current !== null) {
      btnRef.current[oldProfile.current].className = "ch-wrapper";
    }

    if (currentProfile !== null) {
      btnRef.current[currentProfile].className = "ch-wrapper focus";
    }

    oldProfile.current = currentProfile;
  }, [currentProfile]);

  return (
    <>
      <SidebarComp
        searchbar={true}
        body={
          <>
            <div className="category">
              <h2>Friends</h2>
              <p>View and manage friends</p>
            </div>
            <div className="search">
              <button id="search" className="nav-btn"></button>
              <input
                className="search-bar"
                type="text"
                placeholder="Search friends or add by ID"
              />
            </div>
            <div className="list">
              {isError ? (
                <p>No friends found</p>
              ) : isLoading ? (
                <p>Loading...</p>
              ) : (
                friends &&
                friends.map((friend) => (
                  <button className="def-btn" key={friend._id}>
                    <Link
                      ref={(e) => (btnRef.current[friend._id] = e)}
                      onClick={() => setCurrentProfile(friend._id)}
                      className="ch-wrapper"
                      to={`/friends/${friend._id}`}
                    >
                      <img className="icon-md" src={profile} alt="" />
                      <h3 className="ch-name">{friend.username}</h3>
                      <div id="view" className="nav-btn"></div>
                    </Link>
                  </button>
                ))
              )}
            </div>
          </>
        }
      />
    </>
  );
}

export default Sidebar;
