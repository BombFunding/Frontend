import React from "react";
import styles from "../layout.module.scss";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar/Navbar";

const Layout = () => {
	return (
		<>
			<Outlet />
		</>
	);
};

export default Layout;
