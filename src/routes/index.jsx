import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/main";
import Error from "../pages/Error";
import PrivateLayout from "../Layout/private";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    element: <PrivateLayout />,
    children: [],
  },
]);
