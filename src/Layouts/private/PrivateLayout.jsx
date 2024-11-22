import useTokenStore from "@/stores/TokenStore";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import styles from "./PrivateLayout.module.scss";
import Navbar from "@/components/Navbar/Navbar";

const PrivateLayout = () => {
	const TOKEN = useTokenStore((state) => state.accessToken);
	console.log("token: " + TOKEN);
	const Navigate = useNavigate();
	if (!TOKEN) {
		console.log("token not setted!");
		Navigate("/login")
		// return <Navigate to="/login" replace />;
	}
	else {
		console.log("token: " + TOKEN);
	}
	return (
		<>
			<div>
				<Navbar />
				<Outlet />
			</div>
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

export default PrivateLayout;
