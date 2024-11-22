import useTokenStore from "@/stores/TokenStore";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import styles from "./PrivateLayout.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import "react-toastify/dist/ReactToastify.css";

const PrivateLayout = () => {
  const TOKEN = useTokenStore((state) => state.accessToken);
  console.log("token: " + TOKEN);
  if (!TOKEN) {
    console.log("token not setted!");
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <ToastContainer
        position="bottom-right"
        newestOnTop={false}
        autoClose={3000} // Close after 3 seconds
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        closeButton={false}
      />
      <div>
        {/* <Navbar /> PUT NAVEBAR HERE */}
        <Outlet />
      </div>
    </>
  );
};

export default PrivateLayout;
