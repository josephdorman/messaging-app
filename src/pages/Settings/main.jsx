import profile from "../../assets/profileIcon.svg";
import MainComp from "../../components/main";
import UserContext from "../../providers/userContext";
import { getUserCensored } from "../../providers/api";
import { useContext, useState, useEffect, useRef } from "react";

function Main() {
  const [user, setUser] = useState(false);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const censoredUser = await getUserCensored();

      setUser(censoredUser);
    };

    loadUser();
  }, []);

  return (
    <>
      <MainComp
        grid="grid-2"
        body={
          <>
            <nav className="nav-friends">
              <p className="chunky">My Account</p>
            </nav>
            <div className="profile">
              <div className="pf-head">
                <img className="icon-md" src={profile} alt="" />
                <h3>{user.username}</h3>
              </div>
              {edit === "name" ? (
                <div className="pf-section">
                  <p className="chunky">Display Name</p>
                  <div className="pf-btn-wrapper">
                    <button id="pf-save">Save</button>
                    <button onClick={() => setEdit(false)} id="pf-cancel">
                      Cancel
                    </button>
                  </div>
                  <input
                    type="text"
                    className="pf-input"
                    placeholder="Enter new display name here..."
                  />
                </div>
              ) : (
                <div className="pf-section">
                  <p className="chunky">Display Name</p>
                  <button onClick={() => setEdit("name")} className="pf-btn">
                    Edit
                  </button>
                  <p>{user.username}</p>
                </div>
              )}
              {edit === "email" ? (
                <div className="pf-section">
                  <p className="chunky">Email</p>
                  <div className="pf-btn-wrapper">
                    <button id="pf-save">Save</button>
                    <button onClick={() => setEdit(false)} id="pf-cancel">
                      Cancel
                    </button>
                  </div>
                  <input
                    type="text"
                    className="pf-input"
                    placeholder="Enter new email here..."
                  />
                </div>
              ) : (
                <div className="pf-section">
                  <p className="chunky">Email</p>
                  <button onClick={() => setEdit("email")} className="pf-btn">
                    Edit
                  </button>
                  <p>{user.email}</p>
                </div>
              )}
              {edit === "password" ? (
                <div className="pf-section">
                  <p className="chunky">Password</p>
                  <div className="pf-btn-wrapper">
                    <button id="pf-save">Save</button>
                    <button onClick={() => setEdit(false)} id="pf-cancel">
                      Cancel
                    </button>
                  </div>
                  <input
                    type="text"
                    className="pf-input"
                    placeholder="Enter new password here..."
                  />
                </div>
              ) : (
                <div className="pf-section">
                  <p className="chunky">Password</p>
                  <button
                    onClick={() => setEdit("password")}
                    className="pf-btn"
                  >
                    Edit
                  </button>
                  <p>{user.password}</p>
                </div>
              )}
              {edit === "about" ? (
                <div className="pf-section-about">
                  <div>
                    <p className="chunky">About Me</p>
                    <div className="pf-btn-wrapper">
                      <button id="pf-save">Save</button>
                      <button onClick={() => setEdit(false)} id="pf-cancel">
                        Cancel
                      </button>
                    </div>
                  </div>
                  <textarea
                    name="about"
                    id="pf-about-input"
                    maxLength="250"
                    placeholder="Enter new about me here..."
                  ></textarea>
                </div>
              ) : (
                <div className="pf-section-about">
                  <div>
                    <p className="chunky">About Me</p>
                    <button onClick={() => setEdit("about")} className="pf-btn">
                      Edit
                    </button>
                  </div>
                  <p className="pf-about-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam.
                  </p>
                </div>
              )}
            </div>
          </>
        }
      />
    </>
  );
}

export default Main;
