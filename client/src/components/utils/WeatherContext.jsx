import { createContext, useState, useEffect } from "react";

export const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(
            `${position.coords.latitude},${position.coords.longitude}`
          );
        },
        (err) => {
          console.error("Geolocation error:", err);
        }
      );
    } else {
      console.warn("Geolocation not available.");
    }
  }, []);

  useEffect(() => {
    if (location !== null) {
      fetch(`http://localhost:3000/dashboard/weather?location=${location}`)
        .then((res) => res.json())
        .then((data) => setWeather(data));
    }
  }, [location]);

  return (
    <>
      <WeatherContext.Provider value={{ weather, setWeather }}>
        {console.log("location:", location)}
        {console.log("weather:", weather)}
        {children}
      </WeatherContext.Provider>
    </>
  );
}
