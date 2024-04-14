import SidebarComp from "../../components/sidebar";
import profile from "../../assets/profileIcon.svg";
import {
  getChannels,
  getSearchedChannels,
  createChannel,
} from "../../providers/api";
import { useEffect, useState, useContext } from "react";
import SocketContext from "../../providers/socketContext";
import useDebounce from "../../hooks/useDebounce";
import useDateFormat from "../../hooks/useDateFormat";
import { Link } from "react-router-dom";

function Sidebar({ currentChannel, setCurrentChannel }) {
  const { socket } = useContext(SocketContext);
  const [channels, setChannels] = useState(null);
  const [search, setSearch] = useState(null);
  const [searchedChannels, setSearchedChannels] = useState(null);
  const [lastMessage, setLastMessage] = useState(null);
  const [toggleForm, setToggleForm] = useState(false);
  const [isError, setIsError] = useState(false);
  const debouncedSearch = useDebounce(search);

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
    socket.on("refresh_channels", () => {
      getChannels().then((res) => {
        socket.emit("join_channels", res.channels);
        setChannels(res);
      });
    });
  }, [socket]);

  useEffect(() => {
    const loadChannels = async () => {
      const channelsSearched = await getSearchedChannels(debouncedSearch);
      setSearchedChannels(channelsSearched);
    };
    loadChannels();
  }, [debouncedSearch]);

  function getChannelName(channel) {
    if ("main" in channel.channelName) return channel.channelName.main;

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

  const getTimeStamp = (channel, msg) => {
    if (msg && msg.channel === channel._id) {
      return useDateFormat(msg.date);
    } else if ("lastMessage" in channel) {
      return useDateFormat(channel.lastMessage.date);
    }
  };

  const onSubmit = (e) => {
    createChannel(e).then((res) => {
      if (res) {
        console.log(res.data.errors);
      } else {
        e.target.form.createChannel.value = "";
        setToggleForm(false);
        getChannels().then((res) => {
          socket.emit("join_channels", res.channels);
          setChannels(res);
        });
      }
    });
  };

  const onToggle = () => {
    if (toggleForm) {
      setToggleForm(false);
    } else {
      setToggleForm(true);
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
                onChange={(e) => setSearch(e.target.value)}
                className="search-bar"
                type="text"
                placeholder="Search People, Groups, Messages"
              />
            </div>
            <div className="list">
              {toggleForm ? (
                <form className="channel-create">
                  <input
                    type="text"
                    name="createChannel"
                    id="createChannel"
                    placeholder="Enter channel name"
                  />
                  <button onClick={(e) => onSubmit(e)} id="ch-create">
                    Create
                  </button>
                </form>
              ) : (
                <button onClick={onToggle} className="ch-wrapper ch-create">
                  <div id="add" className="nav-btn"></div>
                  <h3>Create a new group</h3>
                </button>
              )}
              {searchedChannels
                ? searchedChannels.map((channel) => {
                    if (channel._id === currentChannel) {
                      return (
                        <button
                          key={channel._id}
                          onClick={() => setCurrentChannel(channel._id)}
                          className="def-btn"
                        >
                          <Link
                            className="ch-wrapper focus"
                            to={`/messages/${channel._id}`}
                          >
                            <img
                              className="icon-md ch-icon"
                              src={profile}
                              alt=""
                            />
                            <h3 className="ch-name">
                              {getChannelName(channel)}
                            </h3>
                            <p className="last-msg">
                              {getLastMessage(channel, lastMessage)}
                            </p>
                            <p>{getTimeStamp(channel, lastMessage)}</p>
                          </Link>
                        </button>
                      );
                    } else {
                      return (
                        <button
                          key={channel._id}
                          onClick={() => setCurrentChannel(channel._id)}
                          className="def-btn"
                        >
                          <Link
                            className="ch-wrapper"
                            to={`/messages/${channel._id}`}
                          >
                            <img
                              className="icon-md ch-icon"
                              src={profile}
                              alt=""
                            />
                            <h3 className="ch-name">
                              {getChannelName(channel)}
                            </h3>
                            <p className="last-msg">
                              {getLastMessage(channel, lastMessage)}
                            </p>
                            <p>{getTimeStamp(channel, lastMessage)}</p>
                          </Link>
                        </button>
                      );
                    }
                  })
                : channels &&
                  channels.channels.map((channel) => {
                    if (channel._id === currentChannel) {
                      return (
                        <button
                          key={channel._id}
                          onClick={() => setCurrentChannel(channel._id)}
                          className="def-btn"
                        >
                          <Link
                            className="ch-wrapper focus"
                            to={`/messages/${channel._id}`}
                          >
                            <img
                              className="icon-md ch-icon"
                              src={profile}
                              alt=""
                            />
                            <h3 className="ch-name">
                              {getChannelName(channel)}
                            </h3>
                            <p className="last-msg">
                              {getLastMessage(channel, lastMessage)}
                            </p>
                            <p>{getTimeStamp(channel, lastMessage)}</p>
                          </Link>
                        </button>
                      );
                    } else {
                      return (
                        <button
                          key={channel._id}
                          onClick={() => setCurrentChannel(channel._id)}
                          className="def-btn"
                        >
                          <Link
                            className="ch-wrapper"
                            to={`/messages/${channel._id}`}
                          >
                            <img
                              className="icon-md ch-icon"
                              src={profile}
                              alt=""
                            />
                            <h3 className="ch-name">
                              {getChannelName(channel)}
                            </h3>
                            <p className="last-msg">
                              {getLastMessage(channel, lastMessage)}
                            </p>
                            <p>{getTimeStamp(channel, lastMessage)}</p>
                          </Link>
                        </button>
                      );
                    }
                  })}
            </div>
          </>
        }
      />
    </>
  );
}

export default Sidebar;
