import { createBrowserRouter } from "react-router-dom";
import Error404 from "@/Pages/Error/404/Error404";
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
import StarBoard from "@/Pages/StarBoard/StarBoard";
import AboutUs from "@/Pages/AboutUs/AboutUs";
import ProjectItem from "@/components/DashBoard/ProjectItem/ProjectItem";
import Likes from "@/components/Likes/Likes";
import Project from "@/components/Project/Project";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ProjectDashboard from "@/Pages/ProjectDashboard/ProjectDashboard";
import StartupProfile from "@/components/Profile/StartupProfile/StartupProfile";
import InvestorProfile from "@/components/Profile/InvestorProfile/InvestorProfile";
import FilterSection from "@/components/FilterSection/FilterSection";
import ProfileTeamBox from "@/components/ProfileTeamBox/ProfileTeamBox";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    errorElement: (
      <>
        <Navbar />
        <Error404 />
        <Footer />
      </>
    ),
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "/test",
        element: <ProfileTeamBox />,
      },
      {
        path: "/profile/:username",
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
        path: "/starboard/:page?",
        element: <StarBoard />,
      },
      {
        path: "/AboutUs",
        element: <AboutUs />,
      },
      {
        path: "/projects/:projectId",
        element: <Project />,
      },
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
      {
        path: "/ProjectDashboard/:projectId",
        element: <ProjectDashboard />,
      },
      {
        path: "Editor/:projectId",
        element: <Editor />,
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
