import { useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import Home from "./components/dashboard/Home";
import Record from "./components/dashboard/Record";
import Friends from "./components/dashboard/Friends";
import Activity from "./components/dashboard/Activity";
import { AuthContext } from "./components/utils/AuthContext";
import { WeatherProvider } from "./components/utils/WeatherContext";

function App() {
  const { auth } = useContext(AuthContext);

  console.log(auth);
  if (auth === null) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      {auth && (
        <WeatherProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<Home />} />
              <Route path="record" element={<Record />} />
              <Route path="friends" element={<Friends />} />
              <Route path="activity" element={<Activity />} />
            </Route>
          </Routes>
        </WeatherProvider>
      )}
      {!auth && (
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route
            path="/dashboard/*"
            element={<Navigate to="/login" replace />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
