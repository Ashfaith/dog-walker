import { useState, useEffect } from "react";
import Login from "./components/sign-in/Login";
import "./App.css";

function App() {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("/usersRouter")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setBackendData(data);
      });
  }, []);

  return (
    <>
      <Login />
    </>
  );
}

export default App;
