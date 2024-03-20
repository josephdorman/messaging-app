import { sendFriendRequest } from "../../providers/api";
import userContext from "../../providers/userContext";
import { useContext, useState } from "react";

function Add() {
  const [error, setError] = useState(null);
  const { user } = useContext(userContext);

  const onClick = (e, id) => {
    sendFriendRequest(e, id).then((res) => {
      console.log(res);
      setError(res);
    });
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
        <div className="error-wrapper">
          {error &&
            error.map((err) => (
              <p key={err.msg} className="error">
                * {err.msg}
              </p>
            ))}
        </div>
      </div>
    </>
  );
}

export default Add;
