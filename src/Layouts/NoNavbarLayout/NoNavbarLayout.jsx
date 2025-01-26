import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const NoNavbarLayout = () => {
	return (
		<div className="place-content-center place-self-center place-items-center relative">
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
			<Outlet />
		</div>
	);
};

export default NoNavbarLayout;
