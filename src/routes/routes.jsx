import { createBrowserRouter } from "react-router-dom";
import Error from "@/Pages/Error/Error";
import Login from "@/Pages/Login/Login";
import Signup from "@/Pages/Signup/Signup";
import ForgetPassword from "@/Pages/ForgetPassword/ForgetPassword";
import ChangePassword from "@/Pages/ChangePassword/ChangePassword";
import PublicLayout from "@/Layouts/Public/PublicLayout";
import Landing from "@/Pages/Landing/Landing";
import NoNavbarLayout from "@/Layouts/NoNavbarLayout/NoNavbarLayout";
import PrivateLayout from "@/Layouts/private/PrivateLayout";
import EmailVerification from "@/Pages/EmailVerification/EmailVerification";
import EditProfile from "@/Pages/EditProfile/EditProfile";
import Profile from "@/Pages/Profile/Profile";
import DashBoard from "@/Pages/DashBoard/DashBoard.jsx";
import ChargeAccount from "@/Pages/ChargeAccount/ChargeAccount";
import InvestorDashBoard from "@/components/DashBoard/InvestorDashBoard/InvestorDashBoard";
import { Loading } from "@/components/Loading/Loading";
import Editor from "@/components/Editor/Editor";
import ProjectEditor from "@/Pages/ProjectDashboard/ProjectDashboard";
import StarBoard from "@/Pages/StarBoard/StarBoard";
import ProjectItem from "@/components/DashBoard/ProjectItem/ProjectItem";

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
				element: (
					<div className="p-20">
						<ProjectItem />
					</div>
				),
			},
			{
				path: "/Profile/:username",
				element: <Profile />,
			},
			{
				path: "/reset-password/:uid/:token",
				element: <ChangePassword />,
			},
			{
				path: "/profile/:username",
				element: <Profile />,
			},
			{
				path: "/starboard",
				element: <StarBoard />,
			},
		],
	},
	{
		element: <PrivateLayout />,
		children: [
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
			{
				path: "/Editor/:projectId",
				element: <ProjectEditor />,
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
