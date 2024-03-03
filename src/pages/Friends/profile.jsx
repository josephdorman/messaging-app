import profile from "../../assets/profileIcon.svg";
import { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import { getFriendProfile } from "../../providers/api";

function Profile() {
  const [friendProfile, setFriendProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const match = useMatch("/friends/:id");

  useEffect(() => {
    getFriendProfile(match.params.id).then((res) => {
      setFriendProfile(res);

      if (res !== false) {
        setIsLoading(false);
      } else {
        setIsError(true);
      }
    });
  }, [match]);

  return (
    <>
      {isError ? (
        <p>User does not exist or is not a friend</p>
      ) : isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="pf">
          <img className="icon-xl" src={profile} alt=""></img>
          <h3 className="friend-pfn">{friendProfile.username}</h3>
          <nav className="nav-profile">
            <button id="messages" className="nav-btn"></button>
            <button id="remove" className="nav-btn"></button>
            <button id="warn" className="nav-btn"></button>
          </nav>
          <div className="about-me">
            <p className="chunky">About Me</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
