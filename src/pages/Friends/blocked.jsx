import profile from "../../assets/profileIcon.svg";
import { useState, useEffect } from "react";
import { getBlocked, unblockUser } from "../../providers/api";

function Blocked() {
  const [blocked, setBlocked] = useState(null);

  useEffect(() => {
    getBlocked().then((res) => {
      setBlocked(res);
    });
  }, []);

  return (
    <>
      <div className="blocked">
        <h3 className="chunky">Blocked - {blocked ? blocked.length : 0}</h3>
        <div className="fr-layout">
          {blocked &&
            blocked.map((user) => (
              <div key={user._id} className="fr">
                <img className="icon-md" src={profile} alt="" />
                <div>{user.username}</div>
                <button
                  onClick={() => unblockUser(user._id)}
                  id="unblock"
                  className="nav-btn"
                ></button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Blocked;
