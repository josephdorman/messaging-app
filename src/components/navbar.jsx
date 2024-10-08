import Modal from "./modal";
import homeIcon from "../assets/homeBold.svg";
import friendIcon from "../assets/friendsBold.svg";
import messageIcon from "../assets/chatBold.svg";
import "../styles/navbar.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { logoutUser } from "../providers/api";
import { useState, useContext } from "react";
import SocketContext from "../providers/socketContext";

/// REGARDING LOGOUT BUTTON ///
// create a modal for logout confirmation
// currently is automatic and asks for no confirmation for testing/development purposes

function Navbar() {
  const [toggleModal, setToggleModal] = useState(false);
  const [focused, setFocused] = useState("home");
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  const logout = () => {
    socket.emit("user_offline");
    logoutUser();
    navigate("/login");
  };

  const onToggleModal = () => {
    if (toggleModal) {
      setToggleModal(false);
    } else {
      setToggleModal(true);
    }
  };

  return (
    <>
      {toggleModal ? (
        <Modal
          title={`Are you sure you want to logout?`}
          perm={false}
          btns={
            <>
              <div>
                <button onClick={logout} id="modal-yes">
                  Yes
                </button>
                <button onClick={onToggleModal} id="modal-no">
                  no
                </button>
              </div>
            </>
          }
        />
      ) : null}
      <div className="navbar">
        <div className="logo-wrapper">
          <img className="logo-sm" src={logo} alt="" />
        </div>
        <nav>
          <div className="line"></div>
          <button
            id="home"
            className="nav-btn"
            onClick={() => setFocused("home")}
            style={{
              backgroundImage: focused === "home" && `url(${homeIcon})`,
            }}
          >
            <Link to="/home"></Link>
          </button>
          {/*
          <button id="notifs" className="nav-btn">
            <Link to="/notifications"></Link>
          </button>
          */}
          <button
            id="friends"
            className="nav-btn"
            onClick={() => setFocused("friends")}
            style={{
              backgroundImage: focused === "friends" && `url(${friendIcon})`,
            }}
          >
            <Link to="/friends"></Link>
          </button>
          <button
            id="messages"
            className="nav-btn"
            onClick={() => setFocused("messages")}
            style={{
              backgroundImage: focused === "messages" && `url(${messageIcon})`,
            }}
          >
            <Link to="/messages"></Link>
          </button>
        </nav>
        <button
          onClick={onToggleModal}
          id="logout"
          className="nav-btn"
        ></button>
      </div>
    </>
  );
}

export default Navbar;
