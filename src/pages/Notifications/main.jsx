import MainComp from "../../components/main";
import {
  getNotifications,
  getNotificationsAnnouncements,
  getNotificationsInvites,
  removeNotification,
} from "../../providers/api";
import { useEffect, useState } from "react";
import profile from "../../assets/profileIcon.svg";

function Main({ filter }) {
  const [notifications, setNotifications] = useState(false);

  useEffect(() => {
    const switchFilter = async () => {
      let notifs = "";

      switch (filter) {
        case "all":
          notifs = await getNotifications();
          setNotifications(notifs);
          break;
        case "invites":
          notifs = await getNotificationsInvites();
          setNotifications(notifs);
          break;
        case "announcements":
          notifs = await getNotificationsAnnouncements();
          setNotifications(notifs);
          break;
      }
    };

    switchFilter();
  }, [filter]);

  const onRemove = (id) => {
    removeNotification(id);
    setNotifications(notifications.filter((notif) => notif._id !== id));
  };

  return (
    <MainComp
      grid="grid-2"
      body={
        <>
          <nav className="nav-friends">
            <p className="chunky">Notification View</p>
          </nav>
          <div className="online">
            {notifications ? (
              <h3 className="chunky">
                {filter} - {notifications.length}
              </h3>
            ) : (
              <h3 className="chunky">{filter} - 0</h3>
            )}
            <div className="fr-layout">
              {notifications
                ? notifications.length < 1
                  ? null
                  : notifications.map((notif) => (
                      <div key={notif._id} className="fr">
                        <img className="icon-md" src={profile} alt="" />
                        <div>
                          <p className="notif-type">{notif.type}</p>
                          {notif.type === "friend" ? (
                            <p className="notif-desc">
                              Pending friend request from{" "}
                              <span>{notif.user.username}</span>
                            </p>
                          ) : notif.type === "channel" ? (
                            <p className="notif-desc">
                              Pending channel invite request from{" "}
                              <span>{notif.user.username}</span>
                            </p>
                          ) : (
                            <p className="notif-desc">
                              {notif.body} <span>{notif.user.username}</span>
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => onRemove(notif._id)}
                          id="decline"
                          className="nav-btn"
                        ></button>
                      </div>
                    ))
                : null}
            </div>
          </div>
        </>
      }
    />
  );
}

export default Main;
