import ManageChannel from "./manageChannel";
import ViewUsers from "./viewUsers";

function MainSidebar({ currentChannel, toggleManage }) {
  return (
    <>
      <div className="ch-chat-sidebar">
        {toggleManage ? (
          <ManageChannel currentChannel={currentChannel} />
        ) : (
          <ViewUsers currentChannel={currentChannel} />
        )}
      </div>
    </>
  );
}

export default MainSidebar;
