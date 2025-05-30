import { useState, useEffect } from "react";
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
      <div>
        {backendData.map((user, i) => (
          <p key={i}>{user.name}</p>
        ))}
      </div>
    </>
  );
}

export default App;
