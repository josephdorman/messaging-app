import profile from "../../assets/profileIcon.svg";
import MainComp from "../../components/main";

function Main() {
  return (
    <>
      <MainComp
        body={
          <>
            <div className="ch user channel-header">
              <img className="icon-lg" src={profile} alt=""></img>
              <div>
                <h3>Channel Name</h3>
                <p>Channel Users</p>
              </div>
            </div>
            <div className="ch-chat">
              <div className="msg-wrapper">
                <img className="icon-md" src={profile} alt="" />
                <div className="msg-user">
                  <h4>Katie Lundon</h4>
                  <p className="chunky">10:22 PM</p>
                </div>
                <p className="msg-body">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
            <div className="send-msg-wrapper">
              <input
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
        }
      />
    </>
  );
}

export default Main;
