import useTokenStore from "@/stores/TokenStore";
import { Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import styles from "./PrivateLayout.module.scss";
import Navbar from "@/components/Navbar/Navbar";

const PrivateLayout = () => {
	const TOKEN = useTokenStore((state) => state.accessToken);
	console.log("token: " + TOKEN);
	if (!TOKEN) {
		console.log("token not setted!");
		return <Navigate to="/login" replace />;
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
