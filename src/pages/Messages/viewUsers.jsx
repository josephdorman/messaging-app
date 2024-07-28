import { useEffect, useRef, useState } from "react";
import { getChannelUsers, getChannelSearchedUsers } from "../../providers/api";
import InviteModal from "./inviteModal";
import useDebounce from "../../hooks/useDebounce";
import profile from "../../assets/profileIcon.svg";

function ViewUsers({ currentChannel }) {
  const [users, setUsers] = useState(null);
  const [searchedUsers, setSearchedUsers] = useState(null);
  const [search, setSearch] = useState("");
  const [toggleModal, setToggleModal] = useState(false);
  const debouncedSearch = useDebounce(search);
  const searchRef = useRef();

  useEffect(() => {
    const loadUsers = async () => {
      const users = await getChannelSearchedUsers(
        debouncedSearch,
        currentChannel
      );

      console.log(users);
      setSearchedUsers(users);
    };

    loadUsers();
  }, [debouncedSearch]);

  useEffect(() => {
    const loadDefaultUsers = async () => {
      const users = await getChannelUsers(currentChannel);

      console.log(users);
      setUsers(users);
    };

    loadDefaultUsers();
  }, []);

  const onToggleModal = () => {
    if (toggleModal) {
      setToggleModal(false);
    } else setToggleModal(true);
  };

  return (
    <>
      {toggleModal && (
        <InviteModal
          onToggleModal={onToggleModal}
          currentChannel={currentChannel}
        />
      )}
      <button
        onClick={onToggleModal}
        id="invite-user"
        className="ch-chat-sb-btn"
      >
        <div id="invite-ch" className="nav-btn" alt=""></div>
        <p>Invite</p>
      </button>
      <p className="chunky">User List</p>
      <p className="ch-chat-sb-title">Add, block or view users here</p>
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
          searchedUsers.map((user) => (
            <div key={user._id} className="def-btn ch-wrapper">
              <img className="icon-md ch-icon" src={profile} alt="" />
              <h3 className="ch-name ch-name-fr">{user.username}</h3>
              <button id="add-user-ch">Add</button>
            </div>
          ))
        ) : users ? (
          users.length <= 0 ? (
            <div className="ch-chat-sb-title">No users found</div>
          ) : (
            users.map((user) => (
              <div key={user._id} className="def-btn ch-wrapper">
                <img className="icon-md ch-icon" src={profile} alt="" />
                <h3 className="ch-name ch-name-fr">{user.username}</h3>
                <button id="add-user-ch">Add</button>
              </div>
            ))
          )
        ) : (
          <div className="ch-chat-sb-title">Searched users will show here</div>
        )}
      </div>
    </>
  );
}

export default ViewUsers;
