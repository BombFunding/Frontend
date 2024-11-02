import React from "react";
import styles from "../layout.module.scss";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
    <Outlet />
    </>
  );
};

export default Layout;
