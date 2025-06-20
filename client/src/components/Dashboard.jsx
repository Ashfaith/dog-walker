import { useState, useEffect, createContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "./dashboard/wrapper/header/Header";
import NavBar from "./dashboard/wrapper/navbar/NavBar";
import "./dashboard.css";

export const WeatherContext = createContext();

function Dashboard() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation(`${position.coords.latitude},${position.coords.longitude}`);
        console.log("location:", location);
      });
    }
  });

  useEffect(() => {
    if (location !== null) {
      fetch(`http://localhost:3000/dashboard/weather?location=${location}`)
        .then((res) => res.json())
        .then((data) => setWeather(data));
    }
  }, [location]);

  return (
    <div className="layout">
      <Header />
      <WeatherContext.Provider value={weather}>
        <main>
          <Outlet />
        </main>
      </WeatherContext.Provider>
      <NavBar />
    </div>
  );
}

export default Dashboard;
