import "../../styles/settings.css";
import SidebarComp from "../../components/sidebar";
import profile from "../../assets/profileIcon.svg";

function Sidebar() {
  return (
    <>
      <SidebarComp
        searchbar={false}
        body={
          <>
            <div className="category">
              <h2>Settings</h2>
              <p>Manage accounts, profile, and more</p>
            </div>
            <div className="list">
              <div className="setting-category">
                <h2 className="chunky">User Settings</h2>
                <button className="setting ">My Account</button>
              </div>
            </div>
          </>
        }
      />
    </>
  );
}

export default Sidebar;
