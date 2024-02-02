import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Signup from "./components/signup";

function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/",
      element: <Signup />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
