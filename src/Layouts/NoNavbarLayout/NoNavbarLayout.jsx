import styles from "./NoNavbarLayout.module.scss";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const NoNavbarLayout = () => {
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
			{/* <ToastContainer
        position="bottom-right"
        autoClose={3000} // Close after 3 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
      /> */}
			<Outlet />
		</>
	);
};

export default NoNavbarLayout;
