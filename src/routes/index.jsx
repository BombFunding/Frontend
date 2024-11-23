import { createBrowserRouter } from "react-router-dom";
import Error from "../pages/Error";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import PublicLayout from "@/Layouts/Public/PublicLayout";
import Landing from "@/Pages/Landing/Landing";
import Navbar from "@/components/Navbar/Navbar";
import NoNavbarLayout from "@/Layouts/NoNavbarLayout/NoNavbarLayout";
import PrivateLayout from "@/Layouts/private/PrivateLayout";
import EmailVerification from "@/Pages/EmailVerification/EmailVerification";
import ForgetPassword from "@/Pages/ForgetPassword/ForgetPassword";
import ChangePassword from "@/Pages/ChangePassword/ChangePassword";

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
		],
	},
	{
		element: <PrivateLayout />,
		children: [
			{
				path: "/test",
				element: <Navbar />,
			},
		],
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
			{
				path: "/emailverification",
				element: <EmailVerification />,
      },
      {
				path: "/forgetpassword",
				element: <ForgetPassword />,
			},
			{
				path: "/reset-password/:uid/:token",
				element: <ChangePassword />,
			},
		],
	},
]);
