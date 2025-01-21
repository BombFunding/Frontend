// import React from "react";
// import OpenLayersComponent from "./MapPage";
// import styles from './googlemap.module.scss'; // وارد کردن CSS Modules

// const GoogleMap = () => {
//   return (
//     <div className={styles["no-navbar-footer"]}>
//       <OpenLayersComponent />
//     </div>
//   );
// };

// export default GoogleMap;


import React from 'react';
import City3D from '@/components/City3D/City3D';  // مسیر فایل کامپوننت شما

const App = () => {
  return (
    <div>
      <City3D />
    </div>
  );
};

export default App;
