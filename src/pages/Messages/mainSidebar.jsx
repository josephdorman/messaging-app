import Modal from "../../components/modal";
import profile from "../../assets/profileIcon.svg";
import { useNavigate } from "react-router-dom";
import { deleteChannel } from "../../providers/api";
import { useState, useContext } from "react";
import SocketContext from "../../providers/socketContext";

function MainSidebar({ currentChannel }) {
  const [toggleModal, setToggleModal] = useState(false);
  const navigate = useNavigate();

  const { socket } = useContext(SocketContext);

  const onToggleModal = () => {
    if (toggleModal) {
      setToggleModal(false);
    } else {
      setToggleModal(true);
    }
  };

  const onChannelDelete = () => {
    setToggleModal(false);
    deleteChannel(currentChannel);
    socket.emit("delete_channel");
    navigate("/messages");
  };
  return (
    <>
      {toggleModal ? (
        <Modal
          title="Are you sure you want to delete this channel?"
          btns={
            <>
              <div>
                <button onClick={onChannelDelete} id="modal-yes">
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
      <div className="ch-chat-sidebar">
        <button id="delete-channel" className="ch-chat-sb-btn">
          <div id="delete-ch" className="nav-btn" alt=""></div>
          <p onClick={onToggleModal}>Delete Channel</p>
        </button>
        <p className="chunky">Mange users</p>
        <p className="ch-chat-sb-title">Add or kick users here</p>
        <div className="select-wrapper">
          <label htmlFor="manage-mode">Mode</label>
          <select id="manage-mode" name="manage-mode">
            <option value="add-user">Add</option>
            <option value="kick-user">Kick</option>
          </select>
        </div>
        <form className="search friend-add ch-chat-sb">
          <input
            className="search-bar ch-chat-sb"
            type="text"
            id="sendReq"
            name="sendReq"
            placeholder="Search for user here"
          ></input>
        </form>
        <div className="list">
          <div className="def-btn ch-wrapper">
            <img className="icon-md ch-icon" src={profile} alt="" />
            <h3 className="ch-name ch-name-fr">Paul Morano</h3>
            <button id="add-user-ch">Add</button>
          </div>
          <div className="def-btn ch-wrapper">
            <img className="icon-md ch-icon" src={profile} alt="" />
            <h3 className="ch-name ch-name-fr">Kate Bennet</h3>
            <button id="remove-user-ch">Remove</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainSidebar;
