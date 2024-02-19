import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/errorPage";
import App from "./App";
import Signup from "./components/signup";
import Login from "./components/login";

function Router() {
  const [user, setUser] = useState(null);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App user={user} setUser={setUser} />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/signup",
      element: <Signup />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: <Login user={user} setUser={setUser} />,
      errorElement: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
