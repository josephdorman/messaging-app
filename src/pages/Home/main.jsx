import { sendFeedback } from "../../providers/api";
import { useRef, useState } from "react";

function Main() {
  const [err, setErr] = useState(false);
  const feedbackRef = useRef(null);

  const submitFeedback = (message) => {
    sendFeedback(message).then((res) => {
      setErr(res);
      if (res.state === true) feedbackRef.current.value = "";
    });
  };

  return (
    <>
      <div className="home">
        <div className="update">
          <h1>Whats New in v1.0</h1>
          <p className="update-desc">
            This is the first release of <b>Vizion</b>, a chat application
            created from scratch by myself (Joseph Dorman) check out my
            portfolio <a>here</a> and my github{" "}
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://github.com/josephdorman"
            >
              here
            </a>
            . <b>Vizion</b> is still in development and will be updated over
            time, however it is not sopose to be a commercial product.{" "}
            <b>Vizion</b> is a project to showcase my skills, and learn new
            technologies all while increasing my skillset as a developer.
          </p>
          <ul className="update-list">
            <li>
              Added an "Online" tab to friends view panel to display online
              friends utilizing real time updates.
            </li>
            <li>
              Included search functionality for most pages including but not
              limited to friends and messages.
            </li>
            <li>
              Removed Notification view as it was redudant and provided no value
              or extra information that users couldnt find elsewhere.
            </li>
            <li>
              Added ability to set an "About Me" to your profile which can be
              set in "Settings", and can be viewed under users profile page.
            </li>
            <li>Better formatting when viewing users profile.</li>
          </ul>
          <h2>Changes in Detail</h2>
          <ul className="update-list">
            <li>
              Notification view was removed because I saw it as redundant,
              previously it was only used to display notifications/alerts of
              pending friend or channel/group invites, which the "Pending" tab
              of the "Friends" view did the same exact thing, which just
              provided a useless tab providing more clutter to the application,
              therefore it was removed and the same information previously
              provided is now in the "Pending" tab of friend view.
            </li>
            <li>
              An "About Me" section was added and can be accessed through the
              settings page. Change your about me to display more information
              about you and anything you want to showcase to a user when they
              view your profile. Vice Versa viewing a user's profile will now
              show their about me underneath their profile.
            </li>
          </ul>
          <div className="feedback">
            <h4>Feedback Form</h4>
            <div className="feedback-res">
              {err.state === true ? (
                <p style={{ color: "#04a704" }}>{err.msg}</p>
              ) : err.state === false ? (
                <p style={{ color: "#f54141" }}>* {err.msg}</p>
              ) : null}
            </div>
            <div className="feedback-submit">
              <p>
                Found a bug? Have feedback or suggestions? Send me a message,
                even criticism or advice is welcomed.
              </p>

              <button onClick={() => submitFeedback(feedbackRef.current.value)}>
                Send
              </button>
            </div>
            <textarea
              ref={feedbackRef}
              placeholder="Type here..."
              name="feedback-form"
              id="feedback-form"
              cols="30"
              rows="10"
              maxLength="1250"
            ></textarea>
          </div>
        </div>
        <div className="upcoming">
          <h3>Upcoming Features</h3>
          <p>
            These are <b>NOT</b> the only features, there will be more features
            added to the list overtime.
          </p>
          <ul>
            <li>Better mobile support.</li>
            <li>Better accessibility support.</li>
            <li>Convert more features to realtime updates.</li>
            <li>Use of emojis and attach files to chats/group messages.</li>
            <li>Change profile picture and channel picture.</li>
            <li>Change channel description.</li>
            <li>Display a user's status (Online, Offline, Away, etc...)</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Main;
