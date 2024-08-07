import profile from "../../assets/profileIcon.svg";
import MainSidebar from "./mainSidebar";
import MainComp from "../../components/main";
import { getMessages, sendMessage } from "../../providers/api";
import { useState, useEffect, useContext, useRef } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import SocketContext from "../../providers/socketContext";
import UserContext from "../../providers/userContext";
import useDateFormat from "../../hooks/useDateFormat";
import deleteIcon from "../../assets/deleteLinear.svg";

function Main({ setCurrentChannel, currentChannel }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [channel, setChannel] = useState(null);
  const [toggleManage, setToggleManage] = useState(false);
  const [toggleUsers, setToggleUsers] = useState(false);

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserContext);
  const match = useMatch("/messages/:channelId");
  const navigate = useNavigate();

  const inputRef = useRef(null);
  const chatRef = useRef();
  const channelManage = useRef();
  const viewUsers = useRef();

  useEffect(() => {
    if (!match) {
      navigate("/messages/65c6e4d2e66df1ba996deeda");
      setIsError(true);
      return;
    }

    getMessages(match.params.channelId).then((res) => {
      setChannel(res);

      if (res !== false) {
        setToggleManage(false);
        setCurrentChannel(match.params.channelId);
        setIsLoading(false);
        setIsError(false);
      } else {
        navigate("/messages/65c6e4d2e66df1ba996deeda");
        setIsError(true);
      }
    });
  }, [match]);

  useEffect(() => {
    socket.on("receive_message", (channel) => {
      setChannel(channel);
    });
  }, [socket]);

  function getChannelName(channel) {
    if ("main" in channel.channelName) return channel.channelName.main;

    const channelName = channel.users.filter(
      (channelUser) => channelUser._id !== user._id
    );

    return channelName[0].username;
  }

  const onEnter = (msg, id) => {
    sendMessage(msg, id);
    socket.emit("send_message", msg, channel, user);
    inputRef.current.value = "";
  };

  const resetScroll = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };

  const onClickManage = () => {
    if (toggleManage) {
      channelManage.current.className = "fr-nav";
      setToggleManage(false);
    } else {
      channelManage.current.className = "fr-nav fr-nav-focus";
      viewUsers.current.className = "fr-nav";
      setToggleManage(true);
      setToggleUsers(false);
    }
  };

  const onClickView = () => {
    if (toggleUsers) {
      viewUsers.current.className = "fr-nav";
      setToggleUsers(false);
    } else {
      viewUsers.current.className = "fr-nav fr-nav-focus";
      channelManage.current.className = "fr-nav";
      setToggleManage(false);
      setToggleUsers(true);
    }
  };

  return (
    <>
      <MainComp
        body={
          <>
            {isError ? (
              <div>No channel selected</div>
            ) : isLoading ? (
              <div>Loading...</div>
            ) : (
              <>
                <div className="ch user channel-header">
                  <img className="icon-lg" src={profile} alt=""></img>
                  <div className="">
                    <h3>{getChannelName(channel)}</h3>
                    {getChannelName(channel) === "Global" ? (
                      <p>
                        This is the global chat room, talk to anybody and
                        everybody.
                      </p>
                    ) : "main" in channel.channelName ? (
                      <p>
                        This is the a user managed and created channel chat
                        room.
                      </p>
                    ) : (
                      <p>This is a private direct message channel.</p>
                    )}
                  </div>
                  <div>
                    <button
                      ref={viewUsers}
                      onClick={onClickView}
                      className="fr-nav"
                      id="view-users"
                    >
                      View Users
                    </button>
                    {channel.owner && (
                      <button
                        ref={channelManage}
                        onClick={onClickManage}
                        className="fr-nav"
                        id="manage"
                      >
                        Manage Channel
                      </button>
                    )}
                  </div>
                </div>
                <div className="channel-view">
                  <div className="ch-chat" ref={chatRef} onLoad={resetScroll}>
                    {channel.messages.length > 0 ? (
                      channel.messages.map((msg) => (
                        <div key={msg._id} className="msg-wrapper">
                          <img className="icon-md" src={profile} alt="" />
                          <div className="msg-user">
                            <h4>{msg.user.username}</h4>
                            <p className="chunky">{useDateFormat(msg.date)}</p>
                          </div>
                          <p className="msg-body">{msg.body}</p>
                        </div>
                      ))
                    ) : (
                      <div className="chunky">
                        No messages yet, type one to begin a chat
                      </div>
                    )}
                  </div>
                  {(toggleManage || toggleUsers) && (
                    <MainSidebar
                      currentChannel={currentChannel}
                      toggleManage={toggleManage}
                      toggleUsers={toggleUsers}
                    />
                  )}
                </div>
                <div className="send-msg-wrapper">
                  <input
                    ref={inputRef}
                    onKeyDown={(e) => {
                      if (e.key === "Enter")
                        onEnter(e.target.value, currentChannel);
                    }}
                    type="text"
                    id="sendMsg"
                    name="sendMsg"
                    placeholder="Type message here..."
                  />
                  <nav className="send-msg-nav">
                    <button id="home" className="nav-btn"></button>
                    <button id="home" className="nav-btn"></button>
                  </nav>
                </div>
              </>
            )}
          </>
        }
      />
    </>
  );
}

export default Main;
