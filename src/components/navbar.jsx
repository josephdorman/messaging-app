import "../styles/navbar.css";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

/// REGARDING LOGOUT BUTTON ///
// create a modal for logout confirmation
// currently is automatic and asks for no confirmation for testing/development purposes

function Navbar() {
  return (
    <div className="navbar">
      <div className="logo-wrapper">
        <img className="logo-sm" src={logo} alt="" />
      </div>
      <nav>
        <div className="line"></div>
        <button id="home" className="nav-btn">
          <Link to="/home"></Link>
        </button>
        <button id="notifs" className="nav-btn">
          <Link to="/notifs"></Link>
        </button>
        <button id="friends" className="nav-btn">
          <Link to="/friends"></Link>
        </button>
        <button id="messages" className="nav-btn">
          <Link to="/messages"></Link>
        </button>
      </nav>
      <button id="logout" className="nav-btn"></button>
    </div>
  );
}

export default Navbar;
