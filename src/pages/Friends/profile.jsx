import Modal from "../../components/modal";
import profile from "../../assets/profileIcon.svg";
import { useEffect, useState } from "react";
import { useMatch, useOutletContext, useNavigate } from "react-router-dom";
import {
  getFriendProfile,
  removeFriend,
  blockUser,
  getDmChannel,
} from "../../providers/api";

function Profile() {
  const navigate = useNavigate();
  const [toggleModal, setToggleModal] = useState(false);
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

  const onMessage = (id) => {
    getDmChannel(id).then((res) => navigate(`/messages/${res._id}`));
  };

  const onToggleModal = (id, action) => {
    if (toggleModal) {
      setToggleModal(false);
    } else {
      setToggleModal({ state: true, id: id, action: action });
    }
  };

  const onAction = () => {
    if (toggleModal.action === "remove") {
      onRemoval(toggleModal.id);
    } else {
      onBlock(toggleModal.id);
    }

    onToggleModal(false);
  };

  return (
    <>
      {toggleModal ? (
        <Modal
          title={`Are you sure you want to ${toggleModal.action} this user?`}
          btns={
            <>
              <div>
                <button onClick={onAction} id="modal-yes">
                  Yes
                </button>
                <button onClick={onToggleModal} id="modal-no">
                  No
                </button>
              </div>
            </>
          }
        />
      ) : null}
      {isError ? (
        <p>User does not exist or is not a friend</p>
      ) : isLoading ? (
        <p>Loading...</p>
      ) : (
        <div key={friendProfile._id} className="pf">
          <img className="icon-xl" src={profile} alt=""></img>
          <h3 className="friend-pfn">{friendProfile.username}</h3>
          <nav className="nav-profile">
            <button
              onClick={() => onMessage(friendProfile._id)}
              id="messages"
              className="nav-btn"
            ></button>
            <button
              onClick={(e) => onToggleModal(friendProfile._id, e.target.id)}
              id="remove"
              className="nav-btn"
            ></button>
            <button
              onClick={(e) => onToggleModal(friendProfile._id, e.target.id)}
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
