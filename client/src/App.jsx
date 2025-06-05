import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    fetch("/auth/check", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setAuth(data.loggedIn))
      .catch(() => setAuth(false));
  }, []);

  if (auth === null) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            auth ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/dashboard"
          element={auth ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
