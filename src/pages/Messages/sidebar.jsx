import SidebarComp from "../../components/sidebar";
import profile from "../../assets/profileIcon.svg";
import { getChannels } from "../../providers/api";
import { useEffect, useState, useContext } from "react";
import SocketContext from "../../providers/socketContext";
import { Link } from "react-router-dom";

function Sidebar({ currentChannel, setCurrentChannel }) {
  const { socket } = useContext(SocketContext);
  const [channels, setChannels] = useState(null);
  const [lastMessage, setLastMessage] = useState(null);

  useEffect(() => {
    getChannels().then((res) => {
      socket.emit("join_channels", res.channels);
      setChannels(res);
    });
  }, []);

  useEffect(() => {
    socket.on("receive_last_message", (data) => {
      setLastMessage(data);
    });
  }, [socket]);

  function getChannelName(channel) {
    if ("name" in channel) return channel.name;

    const channelName = channel.users.filter(
      (user) => user._id !== channels._id
    );

    return channelName[0].username;
  }

  const getLastMessage = (channel, msg) => {
    if (msg && msg.channel === channel._id) {
      if (msg.body.length > 30) {
        return `${msg.body.substring(0, 31)} ...`;
      }
      return msg.body;
    } else {
      if ("lastMessage" in channel) {
        if (channel.lastMessage.body.length > 30) {
          return `${channel.lastMessage.body.substring(0, 31)} ...`;
        }
        return channel.lastMessage.body;
      } else {
        return "No messages exist";
      }
    }
  };

  return (
    <>
      <SidebarComp
        searchbar={true}
        body={
          <>
            <div className="category">
              <h2>Messages</h2>
              <p>People, Group, Messages</p>
            </div>
            <div className="search">
              <button id="search" className="nav-btn"></button>
              <input
                className="search-bar"
                type="text"
                placeholder="Search People, Groups, Messages"
              />
            </div>
            <div className="list">
              {channels ? (
                channels.channels.map((channel) => (
                  <button
                    key={channel._id}
                    onClick={() => setCurrentChannel(channel._id)}
                    className="def-btn"
                  >
                    <Link
                      className="ch-wrapper"
                      to={`/messages/${channel._id}`}
                    >
                      <img className="icon-md ch-icon" src={profile} alt="" />
                      <h3 className="ch-name">{getChannelName(channel)}</h3>
                      <p className="last-msg">
                        {getLastMessage(channel, lastMessage)}
                      </p>
                      <p>10:22 PM</p>
                    </Link>
                  </button>
                ))
              ) : (
                <div>No Channels</div>
              )}
            </div>
          </>
        }
      />
    </>
  );
}

export default Sidebar;
