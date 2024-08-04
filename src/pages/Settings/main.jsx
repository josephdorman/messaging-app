import profile from "../../assets/profileIcon.svg";
import MainComp from "../../components/main";
import UserContext from "../../providers/userContext";
import {
  getUserCensored,
  updateEmail,
  updateUsername,
  updatePassword,
  updateAbout,
} from "../../providers/api";
import { useContext, useState, useEffect, useRef } from "react";

function Main() {
  const [user, setUser] = useState(false);
  const [edit, setEdit] = useState(false);
  const [errors, setErrors] = useState(false);

  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const aboutRef = useRef(null);

  useEffect(() => {
    const loadUser = async () => {
      const censoredUser = await getUserCensored();

      setUser(censoredUser);
    };

    loadUser();
  }, []);

  const updateStuff = async (e) => {
    switch (edit) {
      case "email":
        updateEmail(e).then((res) => {
          setEdit(false);
          setErrors(res);
        });
        break;
      case "name":
        updateUsername(e).then((res) => {
          setEdit(false);
          setErrors(res);
        });
        break;
      case "password":
        updatePassword(e).then((res) => {
          setEdit(false);
          setErrors(res);
        });
        break;
      case "about":
        updateAbout(e).then((res) => {
          setEdit(false);
          setErrors(res);
        });
        break;
    }
  };

  return (
    <>
      <MainComp
        grid="grid-2"
        body={
          <>
            <nav className="nav-friends">
              <p className="chunky">My Account</p>
            </nav>
            <div>
              <div className="profile">
                <div className="pf-head">
                  <img className="icon-md" src={profile} alt="" />
                  <h3>{user.username}</h3>
                </div>
                {edit === "name" ? (
                  <div className="pf-section">
                    <p className="chunky">Display Name</p>
                    <div className="pf-btn-wrapper">
                      <button
                        id="pf-save"
                        onClick={() => updateStuff(usernameRef.current.value)}
                      >
                        Save
                      </button>
                      <button onClick={() => setEdit(false)} id="pf-cancel">
                        Cancel
                      </button>
                    </div>
                    <input
                      ref={usernameRef}
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
                      <button
                        onClick={() => updateStuff(emailRef.current.value)}
                        id="pf-save"
                      >
                        Save
                      </button>
                      <button onClick={() => setEdit(false)} id="pf-cancel">
                        Cancel
                      </button>
                    </div>
                    <input
                      ref={emailRef}
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
                      <button
                        id="pf-save"
                        onClick={() => updateStuff(passwordRef.current.value)}
                      >
                        Save
                      </button>
                      <button onClick={() => setEdit(false)} id="pf-cancel">
                        Cancel
                      </button>
                    </div>
                    <input
                      ref={passwordRef}
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
                        <button
                          onClick={() => updateStuff(aboutRef.current.value)}
                          id="pf-save"
                        >
                          Save
                        </button>
                        <button onClick={() => setEdit(false)} id="pf-cancel">
                          Cancel
                        </button>
                      </div>
                    </div>
                    <textarea
                      ref={aboutRef}
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
                      <button
                        onClick={() => setEdit("about")}
                        className="pf-btn"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="pf-about-text">
                      {user.about ? (
                        user.about
                      ) : (
                        <>
                          No description set, click edit to add a description.
                        </>
                      )}
                    </p>
                  </div>
                )}
              </div>
              {errors && (
                <div className="error-wrapper pf-errors">
                  {errors.map((e) => (
                    <p className="error" key={e.msg}>
                      * {e.msg}
                    </p>
                  ))}
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
