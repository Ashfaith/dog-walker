import { useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import "./App.css";
import { AuthContext } from "./components/AuthContext";

function App() {
  const { auth } = useContext(AuthContext);

  console.log(auth);
  if (auth === null) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            auth ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/dashboard"
          element={auth ? <Dashboard /> : <Navigate to="/login" replace />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
