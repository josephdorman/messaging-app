import "../styles/signup.css";
import logo from "../assets/logo.svg";
import google from "../assets/google.svg";
import facebook from "../assets/facebook.svg";

function Signup() {
  return (
    <>
      <div className="panel">
        <div className="left">
          <img className="logo-xl" src={logo}></img>
        </div>
        <div className="right">
          <div className="signup-wrapper">
            <div className="hero">
              <h1>Create your free account</h1>
              <p>100% free, no microtransactions</p>
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
              <div className="input-wrapper">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" />
              </div>
              <button id="register" className="btn" type="submit">
                Create Account
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
            <p id="reg">
              Already have an account? <a href="/login">Log in</a>
            </p>
          </div>
          <div id="tos">
            <p>By creating an account you account our</p>
            <a href="/tos">Terms of service</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
