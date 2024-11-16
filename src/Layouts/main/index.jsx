import React from "react";
import styles from "../layout.module.scss";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar/Navbar";

const Layout = () => {
	return (
		<>
			<Navbar />
			<Outlet />
		</>
	);
};

export default Layout;
