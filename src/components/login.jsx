import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import google from "../assets/google.svg";
import facebook from "../assets/facebook.svg";

function Login() {
  return (
    <>
      <div className="panel">
        <div className="left">
          <img className="logo-xl" src={logo}></img>
        </div>
        <div className="right">
          <div className="signup-wrapper">
            <div className="hero">
              <h1>Sign in to your account</h1>
            </div>
            <form action="" className="form">
              <div className="input-wrapper">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" />
              </div>
              <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" />
              </div>
              <button id="register" className="btn" type="submit">
                Sign in
              </button>
            </form>
            <p>Or sign in with</p>
            <div className="signup-option-wrapper">
              <button className="signup-option btn">
                <img src={facebook} alt="" className="icon-sm" />
                FACEBOOK
              </button>
              <button className="signup-option btn">
                <img src={google} alt="" className="icon-sm" />
                GOOGLE
              </button>
            </div>
            <div className="signup-option-wrapper"></div>
            <p id="reg">
              Dont have an account? <Link to="/Signup">Sign up</Link>
            </p>
          </div>
          <div id="tos">
            <p>By having an account you accept our</p>
            <a href="/tos">Terms of service</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
