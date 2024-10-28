import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "./components/ui/button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex justify-center align-middle">
        <div className="font-vazirmatn text-end bg-slate-600">دکمه</div>
        <Button className="bg-orange-600 text-white" variant="outline">
          button
        </Button>
      </div>
    </>
  );
}

export default App;
