import "./styles/app.css";
import Navbar from "./components/navbar";
import { Navigate, Outlet } from "react-router-dom";
import { getSession } from "./providers/api";
import UserContext from "./providers/userContext";
import SocketContext from "./providers/socketContext";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3000");

function App({ user, setUser }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getSession().then((res) => {
      setUser(res);

      if (res !== false) {
        setIsLoading(false);
      } else {
        setIsError(true);
      }
    });
  }, []);

  return (
    <>
      {isError ? (
        <Navigate to="/login" replace={true} />
      ) : isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="app">
          <SocketContext.Provider value={{ socket }}>
            <UserContext.Provider value={{ user, setUser }}>
              <Navbar />
              <Outlet />
            </UserContext.Provider>
          </SocketContext.Provider>
        </div>
      )}
    </>
  );
}

export default App;
