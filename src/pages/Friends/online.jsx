import profile from "../../assets/profileIcon.svg";
import { useState, useEffect, useContext } from "react";
import UserContext from "../../providers/userContext";
import SocketContext from "../../providers/socketContext";

function Online() {
  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserContext);
  const [friends, setFriends] = useState(null);

  useEffect(() => {
    socket.emit("get_friends");
    socket.on("receive_friends", (data) => {
      console.log(data);
      const newArr = data.filter((friend) => friend._id !== user._id);
      setFriends(newArr);
    });
  }, [socket]);

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
