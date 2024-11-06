import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "./components/ui/button";
import { Loading } from "./components/Loading";
import { getData, postData } from "@/Servises/ApiClient";

function App() {
  // const [count, setCount] = useState(0);

  //   useEffect(async () => {
  //     try {
  //       const response = await fetch("http://localhost:8000/auth/register/", {
  //         method: "POST", // Specify the method
  //         headers: {
  //           "Content-Type": "application/json", // Set headers
  //         },
  //         body: JSON.stringify({
  //           username: "aliddhjkmosgooltt",
  //           email: "aldddgfdgvhbkjitt@example.com",
  //           password: "Ali12345!",
  //           user_type: "basic",
  //         }),
  //       });

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }

  //       const responseData = await response.json(); // Parse JSON response
  //       console.log(responseData);
  //     } catch (error) {
  //       console.error("Error:", error);
  //       throw error; // Re-throw to handle it higher up if needed
  //     }
  //   }, []);

  useEffect(() => {
    const bodyData = {
      email: "a13w@gmail.com",
      password: "!A1a2a3a4",
    };

    postData("/auth/login/", bodyData).then((response) => {
      console.log("Data posted successfully:", response);
    });
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center align-middle">
        {/* <div className="font-vazirmatn font-bold text-end bg-slate-600">
					دکمه
				</div>
				<Button className="bg-orange-600 text-white" variant="outline">
					button
				</Button>
				<Form /> */}

        <Loading />
      </div>
    </>
  );
}

export default App;
