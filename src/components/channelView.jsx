import "../styles/channelView.css";
import profile from "../assets/profileIcon.svg";

function ChannelView() {
  function fillChat() {
    return (
      <>
        <div className="msg-wrapper">
          <img className="icon-md" src={profile} alt="" />
          <div className="msg">
            <div className="msg-user">
              <h4>Katie Lundon</h4>
              <p>10:22 PM</p>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
        <div className="msg-wrapper">
          <img className="icon-md" src={profile} alt="" />
          <div className="msg">
            <div className="msg-user">
              <h4>Philip Morano</h4>
              <p>7:45 PM</p>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="ch-view">
      <div className="ch ch-header">
        <img className="icon-lg" src={profile} alt="" />
        <div>
          <h3>Product Team</h3>
          <p>
            <span>6 Members</span>, <span>2 Online</span>
          </p>
        </div>
      </div>
      <div className="ch-chat">
        <div className="msg-wrapper">
          <img className="icon-md" src={profile} alt="" />
          <div className="msg">
            <div className="msg-user">
              <h4>Katie Lundon</h4>
              <p>10:22 PM</p>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
        <div className="msg-wrapper">
          <img className="icon-md" src={profile} alt="" />
          <div className="msg">
            <div className="msg-user">
              <h4>Philip Morano</h4>
              <p>7:45 PM</p>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor.
            </p>
          </div>
        </div>
        {fillChat()}
        {fillChat()}
        {fillChat()}
        {fillChat()}
        {fillChat()}
        {fillChat()}
        {fillChat()}
      </div>
      <div className="ch-actions">
        <input
          className="search-bar"
          type="text"
          placeholder="Type message here..."
        />
        <button id="emoji" className="nav-btn"></button>
        <button id="attach" className="nav-btn"></button>
      </div>
    </div>
  );
}

export default ChannelView;
