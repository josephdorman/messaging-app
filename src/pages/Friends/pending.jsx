import profile from "../../assets/profileIcon.svg";
import { useState, useEffect } from "react";
import { getFriendRequests } from "../../providers/api";

function Pending() {
  const [requests, setRequests] = useState(null);

  useEffect(() => {
    getFriendRequests().then((res) => {
      setRequests(res);
    });
  }, []);

  return (
    <>
      <div className="pending">
        <h3 className="chunky">
          Pending -{" "}
          {requests ? requests.received.length + requests.sent.length : 0}
        </h3>
        <div className="fr-layout">
          {requests &&
            requests.received.map((user) => (
              <div key={user._id} className="fr fr-pending">
                <img className="icon-md" src={profile} alt="" />
                <div>
                  <p>{user.username}</p>
                  <p className="pending-status">Incoming friend request</p>
                </div>
                <button id="accept" className="nav-btn"></button>
                <button id="decline" className="nav-btn"></button>
              </div>
            ))}
          {requests &&
            requests.sent.map((user) => (
              <div key={user._id} className="fr fr-pending">
                <img className="icon-md" src={profile} alt="" />
                <div>
                  <p>{user.username}</p>
                  <p className="pending-status">Outgoing friend request</p>
                </div>
                <button id="decline" className="nav-btn"></button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Pending;
