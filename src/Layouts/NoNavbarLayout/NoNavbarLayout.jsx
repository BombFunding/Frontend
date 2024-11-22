import styles from "./NoNavbarLayout.module.scss";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const NoNavbarLayout = () => {
  return (
    <>
      <Outlet />
      <ToastContainer
        position="bottom-right"
        autoClose={3000} // Close after 3 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
      />
    </>
  );
};

export default NoNavbarLayout;
