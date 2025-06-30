import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L, { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./record.css";
import recImage from "../../assets/rec.png";
import MyStopwatch from "../utils/Timer";

function Record() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    distance: "",
    time: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const res = await fetch("http://localhost:3000/dashboard/createPost", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   credentials: "include",
    //   body: JSON.stringify(form),
    // });
    // if (res.ok) {
    //   alert("post created");
    // }

    console.log(form);
  };

  const [currentPos, setCurrentPos] = useState(null);
  const [historicalPos, setHistoricalPos] = useState([]);
  const [distanceTotal, setDistanceTotal] = useState(0);
  const [activityTime, setActivityTime] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setCurrentPos(
            L.latLng(position.coords.latitude, position.coords.longitude)
          );
        },
        (err) => {
          console.error("Geolocation error:", err);
        }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      console.warn("Geolocation not available.");
    }
  }, []);

  const compareArrays = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
  };

  useEffect(() => {
    if (compareArrays(historicalPos[0], currentPos) || !currentPos) {
      return;
    }

    if (historicalPos[0]) {
      const distanceDelta = historicalPos[0].distanceTo(currentPos);
      setDistanceTotal((prev) => prev + distanceDelta);
    }

    setHistoricalPos((prev) => [currentPos, ...prev]);
  }, [currentPos]);

  const customIcon = new Icon({
    iconUrl: recImage,
    iconSize: [30, 30],
  });
  // <a href="https://www.flaticon.com/free-icons/dot" title="dot icons">Dot icons created by iconixar - Flaticon</a>

  return (
    <>
      {!currentPos ? (
        <p>fetching location</p>
      ) : (
        <MapContainer center={currentPos} zoom={17}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={currentPos} icon={customIcon} />
          <Polyline pathOptions={{ color: "blue" }} positions={historicalPos} />
        </MapContainer>
      )}
      <MyStopwatch setActivityTime={setActivityTime} />
      <button
        onClick={() =>
          setForm((prev) => ({
            ...prev,
            distance: distanceTotal,
            time: activityTime,
          }))
        }
      >
        Finish
      </button>
      <h1>Create post</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <input
          type="text"
          name="body"
          placeholder="content"
          value={form.body}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, content: e.target.value }))
          }
        />
        <button type="submit" onClick={(e) => handleSubmit(e)}>
          POST
        </button>
      </form>
    </>
  );
}

export default Record;
