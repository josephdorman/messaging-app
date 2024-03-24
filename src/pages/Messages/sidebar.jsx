import SidebarComp from "../../components/sidebar";
import profile from "../../assets/profileIcon.svg";
import { getChannels } from "../../providers/api";
import { useEffect, useState } from "react";

function Sidebar() {
  const [channels, setChannels] = useState(null);

  useEffect(() => {
    getChannels().then((res) => setChannels(res));
  }, []);

  const getChannelName = (channel) => {
    if ("name" in channel) return channel.name;

    const channelName = channel.users.filter(
      (user) => user._id !== channels._id
    );

    return channelName[0].username;
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
                  <button key={channel._id} className="ch-wrapper">
                    <img className="icon-md" src={profile} alt="" />
                    <div>
                      <h3 className="ch-name">{getChannelName(channel)}</h3>
                      <p className="last-msg">{channel._id}</p>
                    </div>
                    <div className="ch-info">
                      <p>10:22</p>
                      <p>(2)</p>
                    </div>
                  </button>
                ))
              ) : (
                <div>No Channels</div>
              )}
              <button className="ch-wrapper">
                <img className="icon-md" src={profile} alt="" />
                <div>
                  <h3 className="ch-name">Philip Morano</h3>
                  <p className="last-msg">Are you busy atm?</p>
                </div>
                <div className="ch-info">
                  <p>10:22</p>
                  <p>(2)</p>
                </div>
              </button>
            </div>
          </>
        }
      />
    </>
  );
}

export default Sidebar;
