import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
// import { Button } from "./components/ui/button";
import { Loading } from "./components/Loading";
import { getData } from "@/Servises/ApiClient";

function App() {
	useEffect(() => {
		getData().then((data) => console.log(data)); // Fetch data from API and log it in console. This is just a placeholder. Replace it with your actual API call. 3rd argument of useEffect is an array. If it's empty, it will run only once when the component mounts. If it's not empty, it will run every time the array elements change. 4th argument is an optional array of dependencies. If it's provided, it will only run the effect if any of the dependencies change. In this case, it will run every time the data changes. 5th argument is a cleanup function. It will be called when the component unmounts. In this case, it will be called when the component is no longer needed. 6th argument is a dependency array. If it's provided, it will only run the effect if any of the dependencies change. In this case, it will run every time the data changes.
	}, []);

	return (
		<>
			<Loading />
		</>
	);
}

export default App;
