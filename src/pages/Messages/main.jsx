import profile from "../../assets/profileIcon.svg";
import MainComp from "../../components/main";
import { getMessages, sendMessage } from "../../providers/api";
import { useState, useEffect, useContext, useRef } from "react";
import { useMatch } from "react-router-dom";
import SocketContext from "../../providers/socketContext";
import UserContext from "../../providers/userContext";

function Main({ setCurrentChannel, currentChannel }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [channel, setChannel] = useState(null);
  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserContext);
  const match = useMatch("/messages/:channelId");

  const inputRef = useRef(null);
  const chatRef = useRef();

  useEffect(() => {
    if (!match) {
      setIsError(true);
      return;
    }

    getMessages(match.params.channelId).then((res) => {
      setChannel(res);

      if (res !== false) {
        setCurrentChannel(match.params.channelId);
        setIsLoading(false);
        setIsError(false);
      } else {
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
    if ("name" in channel) return channel.name;

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
                    <p>
                      This is the global chat room, talk to anybody and
                      everybody
                    </p>
                  </div>
                </div>
                <div className="ch-chat" ref={chatRef} onLoad={resetScroll}>
                  {channel.messages.length > 0 ? (
                    channel.messages.map((msg) => (
                      <div key={msg._id} className="msg-wrapper">
                        <img className="icon-md" src={profile} alt="" />
                        <div className="msg-user">
                          <h4>{msg.user.username}</h4>
                          <p className="chunky">10:22 PM</p>
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
