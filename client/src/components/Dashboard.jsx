import { useState, useEffect } from "react";
function Dashboard() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/dashboard/weather")
      .then((res) => res.json())
      .then((data) => setWeather(data));
  }, []);

  return (
    <>
      {console.log("testing", weather)}
      <div>Signed In</div>
    </>
  );
}

export default Dashboard;
