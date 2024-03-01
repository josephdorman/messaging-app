import profile from "../../assets/profileIcon.svg";
import addImg from "../../assets/addLinear.svg";
import MainComp from "../../components/main";

function Main() {
  return (
    <>
      <MainComp
        body={
          <>
            <nav className="nav-friends">
              <button className="chunky">Online</button>
              <button className="chunky">Blocked</button>
              <button id="add-friend" className="chunky">
                Add Friend
                <img src={addImg} className="nav-btn" alt="" />
              </button>
            </nav>
            <div className="pf">
              <img className="icon-xl" src={profile} alt=""></img>
              <h3 className="friend-pfn">Paul Morano</h3>
              <nav className="nav-profile">
                <button id="messages" className="nav-btn"></button>
                <button id="remove" className="nav-btn"></button>
                <button id="warn" className="nav-btn"></button>
              </nav>
              <div className="about-me">
                <p className="chunky">About Me</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </>
        }
      />
    </>
  );
}

export default Main;
