import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layouts/Public";
import Error from "../pages/Error";
// import Login from "../pages/Login";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import PrivateLayout from "../Layouts/Private";
import App from "../App.jsx";
import Home from "@/Pages/Landing";
import Profile from "@/Pages/Profile";
import EditProfile from "@/Pages/EditProfile/EditProfile";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      // {
      //   path: "/profile",
      //   element: <Profile />,
      // },
    ],
  },
  {
    element: <PrivateLayout />,
    children: [
      {
        path: "/Profile/:username",
        element: <Profile />,
      },
      {
        path: "/EditProfile",
        element: <EditProfile />,
      },
    ],
  },
]);
