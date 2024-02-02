import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/errorPage";
import App from "./App";
import Signup from "./components/signup";

function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/signup",
      element: <Signup />,
      errorElement: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
