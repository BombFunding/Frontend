import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layouts/main";
import Error from "../pages/Error";
// import Login from "../pages/Login";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import PrivateLayout from "../Layouts/private";
import App from "../App.jsx";
import EmailVerification from "@/Pages/EmailVerification/EmailVerification";
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
			{
				path: "/emailverification",
				element: <EmailVerification />,
			},
		],
	},
	{
		element: <PrivateLayout />,
		children: [],
	},
]);
