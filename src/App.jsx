import "./styles/app.css";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import ChannelView from "./components/channelView";
import { Navigate } from "react-router-dom";
import { getSession } from "./providers/api";
import { useEffect } from "react";

function App({ user, setUser }) {
  useEffect(() => {
    getSession().then((res) => {
      setUser(res);
    });
  });

  return (
    <>
      {user ? (
        <div className="app">
          <Navbar />
          <Sidebar />
          <ChannelView />
        </div>
      ) : (
        <Navigate to="/login" replace={true} />
      )}
    </>
  );
}

export default App;
