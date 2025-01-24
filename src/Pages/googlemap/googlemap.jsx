import React from "react";
import OpenLayersComponent from "./MapPage";
import styles from './googlemap.module.scss';

const GoogleMap = () => {
  return (
    <div className={styles["no-navbar-footer"]}>
      <OpenLayersComponent />
    </div>
  );
};

export default GoogleMap;

