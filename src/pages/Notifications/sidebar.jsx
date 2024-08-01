import SidebarComp from "../../components/sidebar";

function Sidebar({ filter, setFilter }) {
  return (
    <>
      <SidebarComp
        body={
          <>
            <div className="category">
              <h2>Notifications</h2>
              <p>Alerts, messages, and more</p>
            </div>
            <div className="list">
              <div className="setting-category">
                <h2 className="chunky">Filter</h2>
                <button onClick={() => setFilter("all")} className="setting">
                  All
                </button>
                <button
                  onClick={() => setFilter("announcements")}
                  className="setting"
                >
                  Announcements
                </button>
                <button
                  onClick={() => setFilter("invites")}
                  className="setting"
                >
                  Invites
                </button>
              </div>
            </div>
          </>
        }
      />
    </>
  );
}

export default Sidebar;
