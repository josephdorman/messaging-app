import "../styles/sidebar.css";
import profile from "../assets/profileIcon.svg";
import chat from "../assets/chatLinear.svg";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="category">
        <h2>Messages</h2>
        <p>People, Group, Messages</p>
      </div>
      <div>
        <div className="search">
          <button id="search" className="nav-btn"></button>
          <input
            className="search-bar"
            type="text"
            placeholder="Search People, Groups, Messages"
          />
        </div>
        <div className="list">
          <div className="ch-wrapper">
            <div className="ch">
              <img className="icon-md" src={profile} alt="" />
              <div>
                <h3 className="ch-name">Philip Morano</h3>
                <p className="last-msg">Are you busy atm?</p>
              </div>
            </div>
            <div className="ch-info">
              <p>10:22</p>
              <p>(2)</p>
            </div>
          </div>
          <div className="ch-wrapper">
            <div className="ch">
              <img className="icon-md" src={profile} alt="" />
              <div>
                <h3 className="ch-name">Philip Morano</h3>
                <p className="last-msg">Are you busy atm?</p>
              </div>
            </div>
            <div className="ch-info">
              <p>10:22</p>
              <p>(2)</p>
            </div>
          </div>
          <div className="ch-wrapper">
            <div className="ch">
              <img className="icon-md" src={profile} alt="" />
              <div>
                <h3 className="ch-name">Philip Morano</h3>
                <p className="last-msg">Are you busy atm?</p>
              </div>
            </div>
            <div className="ch-info">
              <p>10:22</p>
              <p>(2)</p>
            </div>
          </div>
        </div>
      </div>
      <div className="ch user">
        <img className="icon-md" src={profile} alt="" />
        <div>
          <h3 className="ch-name">Joseph Dorman</h3>
          <p className="status">Online</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
