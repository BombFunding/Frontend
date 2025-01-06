import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import styles from "./PublicLayout.module.scss";

const PublicLayout = () => {
  return (
    <>
      <ToastContainer
        toastStyle={{
          backgroundColor: "#2C2727",
          fontSize: "16px",
          borderRadius: "8px",
        }}
        position="bottom-right"
        autoClose={2000}
        closeOnClick
        draggable
        theme="dark"
        newestOnTop={true}
        role="alert"
        closeButton={false}
        limit={5}
      />
      <div className={styles.topMargin}>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default PublicLayout;
