import SidebarComp from "../../components/sidebar";
import profile from "../../assets/profileIcon.svg";
import { getFriends, getSearchedFriends } from "../../providers/api";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";

function Sidebar({
  currentProfile,
  setCurrentProfile,
  setCurrentPage,
  newFriend,
  setNewFriend,
}) {
  const [friends, setFriends] = useState();
  const [searchedUsers, setSearchedFriends] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

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
    oldProfile.current = null;
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

  useEffect(() => {
    const loadUsers = async () => {
      const users = await getSearchedFriends(debouncedSearch);
      setSearchedFriends(users);
    };
    loadUsers();
  }, [debouncedSearch]);

  const unFocusPage = () => {
    setCurrentPage(null);
  };

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
                onChange={(e) => setSearch(e.target.value)}
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
              ) : searchedUsers ? (
                searchedUsers.map((user) => {
                  if (user._id === currentProfile) {
                    return (
                      <button
                        onClick={unFocusPage}
                        className="def-btn"
                        key={user._id}
                      >
                        <Link
                          ref={(e) => (btnRef.current[user._id] = e)}
                          onClick={() => setCurrentProfile(user._id)}
                          className="ch-wrapper focus"
                          to={`/friends/${user._id}`}
                        >
                          <img
                            className="icon-md ch-icon"
                            src={profile}
                            alt=""
                          />
                          <h3 className="ch-name ch-name-fr">
                            {user.username}
                          </h3>
                          <div id="view" className="nav-btn"></div>
                        </Link>
                      </button>
                    );
                  } else {
                    return (
                      <button
                        onClick={unFocusPage}
                        className="def-btn"
                        key={user._id}
                      >
                        <Link
                          ref={(e) => (btnRef.current[user._id] = e)}
                          onClick={() => setCurrentProfile(user._id)}
                          className="ch-wrapper"
                          to={`/friends/${user._id}`}
                        >
                          <img
                            className="icon-md ch-icon"
                            src={profile}
                            alt=""
                          />
                          <h3 className="ch-name ch-name-fr">
                            {user.username}
                          </h3>
                          <div id="view" className="nav-btn"></div>
                        </Link>
                      </button>
                    );
                  }
                })
              ) : (
                friends &&
                friends.map((friend) => {
                  if (friend._id === currentProfile) {
                    return (
                      <button
                        onClick={unFocusPage}
                        className="def-btn"
                        key={friend._id}
                      >
                        <Link
                          ref={(e) => (btnRef.current[friend._id] = e)}
                          onClick={() => setCurrentProfile(friend._id)}
                          className="ch-wrapper focus"
                          to={`/friends/${friend._id}`}
                        >
                          <img className="icon-md" src={profile} alt="" />
                          <h3 className="ch-name">{friend.username}</h3>
                          <div id="view" className="nav-btn"></div>
                        </Link>
                      </button>
                    );
                  } else {
                    return (
                      <button
                        onClick={unFocusPage}
                        className="def-btn"
                        key={friend._id}
                      >
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
                    );
                  }
                })
              )}
            </div>
          </>
        }
      />
    </>
  );
}

export default Sidebar;
