import { createBrowserRouter } from "react-router-dom";
import Error from "@/Pages/Error/Error";
import Login from "@/Pages/Login/Login";
import Signup from "@/Pages/Signup/Signup";
import ForgetPassword from "@/Pages/ForgetPassword/ForgetPassword";
import ChangePassword from "@/Pages/ChangePassword/ChangePassword";
import PublicLayout from "@/Layouts/Public/PublicLayout";
import Landing from "@/Pages/Landing/Landing";
import Navbar from "@/components/Navbar/Navbar";
import NoNavbarLayout from "@/Layouts/NoNavbarLayout/NoNavbarLayout";
import PrivateLayout from "@/Layouts/private/PrivateLayout";
import EmailVerification from "@/Pages/EmailVerification/EmailVerification";
import EditProfile from "@/Pages/EditProfile/EditProfile";
import Profile from "@/Pages/Profile/Profile";
import DashBoard from "@/Pages/DashBoard/DashBoard.jsx";
import ChargeAccount from "@/Pages/ChargeAccount/ChargeAccount";
import InvestorDashBoard from "@/components/DashBoard/InvestorDashBoard/InvestorDashBoard";
import { Loading } from "@/components/Loading/Loading";
import BlankPage from "@/Pages/Balnkpage";

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
				path: "/Profile/:username",
				element: <Profile />,
			},
			{
				path: "/blank",
				element: <BlankPage />,
			},
			{
				path: "/reset-password/:uid/:token",
				element: <ChangePassword />,
			},
			{
				path: "/profile/:username",
				element: <Profile />,
			}
		],
	},
	{
		element: <PrivateLayout />,
		children: [
			{
				path: "/test",
				element: <Loading />,
			},
			{
				path: "/EditProfile",
				element: <EditProfile />,
			},
			{
				path: "/DashBoard",
				element: <DashBoard />,
			},
			{
				path: "/ChargeAccount",
				element: <ChargeAccount />,
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
		],
	},
]);
