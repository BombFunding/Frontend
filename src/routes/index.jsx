import { createBrowserRouter } from "react-router-dom";
import Error from "../pages/Error";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import PrivateLayout from "../Layouts/private";
import PublicLayout from "@/Layouts/Public/PublicLayout";
import Landing from "@/Pages/Landing/Landing";
import Navbar from "@/components/Navbar/Navbar";
import NoNavbarLayout from "@/Layouts/NoNavbarLayout/NoNavbarLayout";
export const router = createBrowserRouter([
	{
		path: "/",
		element: <PublicLayout />,
		errorElement: <Error />,
		children: [
			{
				index: true,
				element: <Landing />,
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
	{
		element: <NoNavbarLayout />,
		children: [
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/signup",
				element: <Signup />,
			},
		],
	},
]);
