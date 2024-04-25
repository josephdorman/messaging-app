import Modal from "../../components/modal";
import profile from "../../assets/profileIcon.svg";
import { useNavigate } from "react-router-dom";
import {
  deleteChannel,
  getSearchedFriendsInChannel,
} from "../../providers/api";
import { useState, useContext, useEffect, useRef } from "react";
import useDebounce from "../../hooks/useDebounce";
import SocketContext from "../../providers/socketContext";

function MainSidebar({ currentChannel }) {
  const [toggleModal, setToggleModal] = useState(false);
  const [search, setSearch] = useState("");
  const [searchMode, setSearchMode] = useState("add");
  const [searchedUsers, setSearchedUsers] = useState(null);
  const debouncedSearch = useDebounce(search);
  const navigate = useNavigate();

  const { socket } = useContext(SocketContext);
  const searchRef = useRef(null);

  useEffect(() => {
    const loadUsers = async () => {
      const users = await getSearchedFriendsInChannel(
        debouncedSearch,
        currentChannel,
        searchMode
      );

      setSearchedUsers(users);
    };

    loadUsers();
  }, [debouncedSearch]);

  const onSearchToggle = (value) => {
    searchRef.current.value = "";
    setSearch("");
    setSearchMode(value);
  };

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
        <p className="chunky">Manage users</p>
        <p className="ch-chat-sb-title">Add or kick users here</p>
        <div className="select-wrapper">
          <label htmlFor="manage-mode">Mode</label>
          <select
            onChange={(e) => onSearchToggle(e.target.value)}
            id="manage-mode"
            name="manage-mode"
          >
            <option value="add">Add</option>
            <option value="kick">Kick</option>
          </select>
        </div>
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
          {searchedUsers && search ? (
            searchedUsers.length <= 0 ? (
              <div className="ch-chat-sb-title">No results for "{search}"</div>
            ) : searchMode === "add" ? (
              searchedUsers.map((user) => (
                <div key={user._id} className="def-btn ch-wrapper">
                  <img className="icon-md ch-icon" src={profile} alt="" />
                  <h3 className="ch-name ch-name-fr">{user.username}</h3>
                  <button id="add-user-ch">Add</button>
                </div>
              ))
            ) : (
              searchedUsers.map((user) => (
                <div key={user._id} className="def-btn ch-wrapper">
                  <img className="icon-md ch-icon" src={profile} alt="" />
                  <h3 className="ch-name ch-name-fr">{user.username}</h3>
                  <button id="remove-user-ch">Remove</button>
                </div>
              ))
            )
          ) : (
            <div className="ch-chat-sb-title">
              Searched users will show here
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MainSidebar;
