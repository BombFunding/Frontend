import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layouts/main";
import Error from "../pages/Error";
import Login from "../pages/Login";
import PrivateLayout from "../Layouts/private";
import App from "../App.jsx";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		errorElement: <Error />,
		children: [
			{
				index: true,
				element: <App />,
			},
			{
				path: "/login",
				element: <Login />,
			},
		],
	},
	{
		element: <PrivateLayout />,
		children: [],
	},
]);
