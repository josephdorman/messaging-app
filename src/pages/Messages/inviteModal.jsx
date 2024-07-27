import { useState, useEffect } from "react";
import {
  getChannelFriends,
  getChannelSearchedFriends,
} from "../../providers/api";
import useDebounce from "../../hooks/useDebounce";
import "../../styles/modal.css";
import exit from "../../assets/addBold.svg";

function InviteModal({ onToggleModal, currentChannel }) {
  const [users, setUsers] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    const loadDefaultUsers = async () => {
      const users = await getChannelFriends(currentChannel);

      console.log(users);
      setUsers(users);
    };

    loadDefaultUsers();
  }, []);

  useEffect(() => {
    const loadSearchedUsers = async () => {
      const users = await getChannelSearchedFriends(
        debouncedSearch,
        currentChannel
      );

      setSearchedUsers(users);
    };

    loadSearchedUsers();
  }, [debouncedSearch]);

  return (
    <div className="modal">
      <div className="modal-box">
        <div className="modal-title">
          <h3>Invite Users</h3>
          <img
            onClick={onToggleModal}
            src={exit}
            id="exit-modal"
            className="nav-btn"
            alt=""
          />
        </div>
        <p className="ch-chat-sb-title">Invite users from friends list here</p>
        <form className="search friend-add ch-chat-sb">
          <input
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
            searchedUsers.map((user) => (
              <div key={user._id} className="def-btn ch-wrapper">
                <img
                  className="icon-md ch-icon"
                  src="/src/assets/profileIcon.svg"
                  alt=""
                ></img>
                <h3 className="ch-name ch-name-fr">{user.username}</h3>
                <button id="add-user-ch">Invite</button>
              </div>
            ))
          ) : users ? (
            users.map((user) => (
              <div key={user._id} className="def-btn ch-wrapper">
                <img
                  className="icon-md ch-icon"
                  src="/src/assets/profileIcon.svg"
                  alt=""
                ></img>
                <h3 className="ch-name ch-name-fr">{user.username}</h3>
                <button id="add-user-ch">Invite</button>
              </div>
            ))
          ) : (
            <div>no users found</div>
          )}

          {/*users &&
            users.map((user) => (
              <div key={user.id} className="def-btn ch-wrapper">
                <img
                  className="icon-md ch-icon"
                  src="/src/assets/profileIcon.svg"
                  alt=""
                ></img>
                <h3 className="ch-name ch-name-fr">{user.username}</h3>
                <button id="add-user-ch">Invite</button>
              </div>
            ))*/}
        </div>
      </div>
    </div>
  );
}

export default InviteModal;
