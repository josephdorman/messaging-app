import SidebarComp from "../../components/sidebar";
import profile from "../../assets/profileIcon.svg";

function Sidebar() {
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
