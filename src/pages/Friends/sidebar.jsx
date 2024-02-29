import SidebarComp from "../../components/sidebar";
import profile from "../../assets/profileIcon.svg";
import { getFriends } from "../../providers/api";
import { useEffect, useState } from "react";

function Sidebar() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [friends, setFriends] = useState();

  useEffect(() => {
    getFriends().then((res) => {
      setFriends(res);

      if (res !== false) {
        setIsLoading(false);
      } else {
        setIsError(true);
      }
    });
  }, []);

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
                  <button key={friend._id} className="ch-wrapper">
                    <img className="icon-md" src={profile} alt="" />
                    <h3 className="ch-name">{friend.username}</h3>
                    <button id="view" className="nav-btn"></button>
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
