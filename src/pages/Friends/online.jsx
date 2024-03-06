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
      <div className="friends-online">
        {friends &&
          friends.map((friend) => (
            <div key={friend.socketId} className="fr-online">
              <img className="icon-md" src={profile} alt="" />
              <p>{friend.userId}</p>
            </div>
          ))}
      </div>
    </>
  );
}

export default Online;
