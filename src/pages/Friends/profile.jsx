import profile from "../../assets/profileIcon.svg";
import { useEffect, useState } from "react";
import { useMatch, useOutletContext, useNavigate } from "react-router-dom";
import { getFriendProfile, removeFriend, blockUser } from "../../providers/api";

function Profile() {
  const navigate = useNavigate();
  const [friendProfile, setFriendProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { setCurrentProfile, setNewFriend } = useOutletContext();
  const match = useMatch("/friends/:id");

  useEffect(() => {
    getFriendProfile(match.params.id).then((res) => {
      setFriendProfile(res);

      if (res !== false) {
        setCurrentProfile(match.params.id);
        setIsLoading(false);
      } else {
        setIsError(true);
      }
    });
  }, [match]);

  const onRemoval = (id) => {
    removeFriend(id);

    setNewFriend(true);
    navigate("/friends/online");
  };

  const onBlock = (id) => {
    blockUser(id);

    setNewFriend(true);
    navigate("/friends/online");
  };

  return (
    <>
      {isError ? (
        <p>User does not exist or is not a friend</p>
      ) : isLoading ? (
        <p>Loading...</p>
      ) : (
        <div key={friendProfile._id} className="pf">
          <img className="icon-xl" src={profile} alt=""></img>
          <h3 className="friend-pfn">{friendProfile.username}</h3>
          <nav className="nav-profile">
            <button id="messages" className="nav-btn"></button>
            <button
              onClick={() => onRemoval(friendProfile._id)}
              id="remove"
              className="nav-btn"
            ></button>
            <button
              onClick={() => onBlock(friendProfile._id)}
              id="block"
              className="nav-btn"
            ></button>
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
