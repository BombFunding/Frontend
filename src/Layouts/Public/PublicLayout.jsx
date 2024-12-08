import React from "react";
import styles from "./PublicLayout.module.scss";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "/src/components/Footer/Footer.jsx"

const PublicLayout = () => {
	return (
		<>
			<div>
				<Navbar />
				<Outlet />
				<Footer />
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

export default PublicLayout;
