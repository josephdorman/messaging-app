import "./styles/app.css";
import Navbar from "./components/navbar";
import { Navigate, Outlet } from "react-router-dom";
import { getSession } from "./providers/api";
import UserContext from "./providers/userContext";
import { useEffect, useState } from "react";

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
          <UserContext.Provider value={{ user, setUser }}>
            <Navbar />
            <Outlet />
          </UserContext.Provider>
        </div>
      )}
    </>
  );
}

export default App;
