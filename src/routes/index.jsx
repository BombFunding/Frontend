import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layouts/main";
import Error from "../pages/Error";
// import Login from "../pages/Login";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import PrivateLayout from "../Layouts/private";
import App from "../App.jsx";
import ForgetPassword from "@/Pages/ForgetPassword/ForgetPassword";
import ChangePassword from "@/Pages/ChangePassword/ChangePassword";
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
				path: "/forgetpassword",
				element: <ForgetPassword />,
			},
			{
				path: "/changepassword",
				element: <ChangePassword />,
			},
		],
	},
	{
		element: <PrivateLayout />,
		children: [],
	},
]);
