import SidebarComp from "../../components/sidebar";

function Sidebar() {
  return (
    <SidebarComp
      searchbar={false}
      body={
        <>
          <div className="category">
            <h2>Home</h2>
            <p>View updates, upcoming features and more</p>
          </div>
          <div className="list">
            <div className="setting-category">
              <h2 className="chunky">Directory</h2>
              <button className="setting ">Whats New in v1.0</button>
              <button className="setting ">Changes in Detail</button>
              <button className="setting ">Upcoming Features</button>
              <button className="setting ">Feedback Form</button>
            </div>
          </div>
        </>
      }
    />
  );
}

export default Sidebar;
