import SidebarComp from "../../components/sidebar";
import profile from "../../assets/profileIcon.svg";
import { getChannels } from "../../providers/api";
import { useEffect, useState, useContext } from "react";
import SocketContext from "../../providers/socketContext";
import { Link } from "react-router-dom";

function Sidebar({ currentChannel, setCurrentChannel }) {
  const { socket } = useContext(SocketContext);
  const [channels, setChannels] = useState(null);

  useEffect(() => {
    getChannels().then((res) => {
      socket.emit("join_channels", res.channels);
      setChannels(res);
    });
  }, []);

  function getChannelName(channel) {
    if ("name" in channel) return channel.name;

    const channelName = channel.users.filter(
      (user) => user._id !== channels._id
    );

    return channelName[0].username;
  }

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
                      <img className="icon-md" src={profile} alt="" />
                      <div>
                        <h3 className="ch-name">{getChannelName(channel)}</h3>
                        <p className="last-msg">{channel._id}</p>
                      </div>
                      <div className="ch-info">
                        <p>10:22</p>
                        <p>(2)</p>
                      </div>
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
