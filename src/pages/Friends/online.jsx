import profile from "../../assets/profileIcon.svg";
import { getOnlineFriends } from "../../providers/api";
import { useState, useEffect, useContext } from "react";
import UserContext from "../../providers/userContext";
import SocketContext from "../../providers/socketContext";

function Online() {
  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserContext);
  const [friends, setFriends] = useState(null);

  useEffect(() => {
    socket.on("friend_online", () => {
      socket.emit("refresh_friends", user._id);
    });

    socket.on("friend_offline", () => {
      socket.emit("refresh_friends", user._id);
    });

    socket.on("get_friends", (friends) => {
      setFriends(friends);
    });
  }, [socket]);

  useEffect(() => {
    getOnlineFriends().then((res) => {
      setFriends(res);
    });
  }, []);

  return (
    <>
      <div className="online">
        {friends ? (
          <h3 className="chunky">Online - {friends.length}</h3>
        ) : (
          <h3 className="chunky">Online - 0</h3>
        )}
        <div className="fr-layout">
          {friends &&
            friends.map((friend) => (
              <div key={friend._id} className="fr">
                <img className="icon-md" src={profile} alt="" />
                <p>{friend.username}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Online;
