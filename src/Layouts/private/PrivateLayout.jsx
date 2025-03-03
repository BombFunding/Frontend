import useTokenStore from "@/stores/TokenStore";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const PrivateLayout = () => {
  const TOKEN = useTokenStore((state) => state.accessToken);
  console.log("token: " + TOKEN);
  const Navigate = useNavigate();
  if (!TOKEN) {
    console.log("token not setted!");
    window.scrollTo(0, 0);
    Navigate("/login");
  } else {
    console.log("token: " + TOKEN);
  }
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
      <div className={`mt-12 sm:mt-20`}>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default PrivateLayout;
