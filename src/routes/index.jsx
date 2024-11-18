import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layouts/main";
import Error from "../pages/Error";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import PrivateLayout from "../Layouts/private";
import App from "../App.jsx";
import Landing from "@/Pages/Landing/Landing";
import Navbar from "@/components/Navbar/Navbar";
export const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		errorElement: <Error />,
		children: [
			{
				index: true,
				element: <Landing />,
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/signup",
				element: <Signup />,
			},
			{
				path: "/test",
				element: <Navbar />,
			},
		],
	},
	{
		element: <PrivateLayout />,
		children: [],
	},
]);
