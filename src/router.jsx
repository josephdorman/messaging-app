import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/errorPage";
import App from "./App";
import Signup from "./components/signup";
import Login from "./components/login";
import Settings from "./pages/Settings/index";
import Messages from "./pages/Messages/index";
import Friends from "./pages/Friends/index";
import Online from "./pages/Friends/online";
import FriendsProfile from "./pages/Friends/profile";

function Router() {
  const [user, setUser] = useState(null);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App user={user} setUser={setUser} />,
      children: [
        {
          path: "settings",
          element: <Settings />,
          errorElement: <ErrorPage />,
        },
        {
          path: "messages",
          element: <Messages />,
          errorElement: <ErrorPage />,
        },
        {
          path: "friends",
          element: <Friends />,
          children: [
            {
              path: "/friends",
              element: <Online />,
              errorElement: <ErrorPage />,
            },
            {
              path: ":id",
              element: <FriendsProfile />,
              errorElement: <ErrorPage />,
            },
            {
              path: "online",
              element: <Online />,
              errorElement: <ErrorPage />,
            },
          ],
          errorElement: <ErrorPage />,
        },
      ],
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
