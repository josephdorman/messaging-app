import profile from "../../assets/profileIcon.svg";
import { useState, useEffect, useContext } from "react";
import SocketContext from "../../providers/socketContext";

function Online() {
  const { socket } = useContext(SocketContext);
  const [friends, setFriends] = useState(null);

  useEffect(() => {
    socket.emit("get_friends");
    socket.on("receive_friends", (data) => {
      setFriends(data);
    });
  }, [socket]);

  return (
    <>
      <div className="online">
        <h3 className="chunky">Online - 1</h3>
        <div className="fr-layout">
          {friends &&
            friends.map((friend) => (
              <div key={friend.socketId} className="fr">
                <img className="icon-md" src={profile} alt="" />
                <p>{friend.userId}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Online;
