import { useEffect, useState, useRef, useContext } from "react";
import {
  deleteChannel,
  getChannelUsers,
  getChannelSearchedUsers,
  kickUser,
} from "../../providers/api";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import SocketContext from "../../providers/socketContext";
import profile from "../../assets/profileIcon.svg";

function ManageChannel({ currentChannel }) {
  const [toggleModal, setToggleModal] = useState(false);
  const [users, setUsers] = useState(null);
  const [search, setSearch] = useState("");
  const [searchedUsers, setSearchedUsers] = useState(null);
  const debouncedSearch = useDebounce(search);
  const navigate = useNavigate();

  const { socket } = useContext(SocketContext);
  const searchRef = useRef(null);

  useEffect(() => {
    const loadUsers = async () => {
      const users = await getChannelUsers(currentChannel);

      setUsers(users);
    };

    loadUsers();
  }, []);

  useEffect(() => {
    const loadSearchedUsers = async () => {
      const users = await getChannelSearchedUsers(
        debouncedSearch,
        currentChannel
      );

      setSearchedUsers(users);
    };

    loadSearchedUsers();
  }, [debouncedSearch]);

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
          perm={true}
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
      <button id="delete-channel" className="ch-chat-sb-btn">
        <div id="delete-ch" className="nav-btn" alt=""></div>
        <p onClick={onToggleModal}>Delete Channel</p>
      </button>
      <p className="chunky">Manage users</p>
      <p className="ch-chat-sb-title">Kick or promote users here</p>
      <form className="search friend-add ch-chat-sb">
        <input
          ref={searchRef}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar ch-chat-sb"
          type="text"
          id="sendReq"
          name="sendReq"
          placeholder="Search for user here"
        ></input>
      </form>
      <div className="list">
        {searchedUsers ? (
          searchedUsers.length <= 0 ? (
            <div className="ch-chat-sb-title">
              Searched users will show here
            </div>
          ) : (
            searchedUsers.map((user) => (
              <div key={user._id} className="def-btn ch-wrapper">
                <img className="icon-md ch-icon" src={profile} alt="" />
                <h3 className="ch-name ch-name-fr">{user.username}</h3>
                <div className="user-btn-wrapper">
                  <button
                    onClick={() => kickUser(user._id, currentChannel)}
                    id="remove-user-ch"
                  >
                    Kick
                  </button>
                </div>
              </div>
            ))
          )
        ) : users ? (
          users.map((user) => (
            <div key={user._id} className="def-btn ch-wrapper">
              <img className="icon-md ch-icon" src={profile} alt="" />
              <h3 className="ch-name ch-name-fr">{user.username}</h3>
              <div className="user-btn-wrapper">
                <button
                  onClick={() => kickUser(user._id, currentChannel)}
                  id="remove-user-ch"
                >
                  Kick
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="ch-chat-sb-title">Searched users will show here</div>
        )}
      </div>
    </>
  );
}

export default ManageChannel;
