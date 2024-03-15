import { sendFriendRequest } from "../../providers/api";
import userContext from "../../providers/userContext";
import { useContext } from "react";

function Add() {
  const { user } = useContext(userContext);

  const onClick = (e, id) => {
    sendFriendRequest(e, id);
    e.target.form.sendReq.value = "";
  };

  return (
    <>
      <div className="add-friend-wrapper">
        <h3 className="chunky">Add Friend</h3>
        <p>You can add friends here by their username</p>
        <form className="search friend-add">
          <input
            className="search-bar"
            type="text"
            id="sendReq"
            name="sendReq"
            placeholder="You can add friends here by their username"
          />
          <button onClick={(e) => onClick(e, user._id)} id="send-request">
            Send Friend Request
          </button>
        </form>
      </div>
    </>
  );
}

export default Add;
