import { useContext } from "react";
import { WeatherContext } from "../Dashboard";

function Home() {
  const weather = useContext(WeatherContext);

  return (
    <div>
      {console.log(weather)}
      {weather !== null ? (
        <div>
          <h1>Current conditions</h1>
          <p>{weather.current.condition.text}</p>
          <p>{weather.current.temp_c}</p>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Home;
