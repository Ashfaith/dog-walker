import { useState, useEffect, createContext } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L, { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./record.css";
import recImage from "../../assets/rec.png";
import Stopwatch from "../utils/Timer";
import ActivityDrawer from "../utils/ActivityDrawer";

export const DrawerContext = createContext(null);

function Record() {
  const [currentPos, setCurrentPos] = useState(null);
  const [historicalPos, setHistoricalPos] = useState([]);
  const [distanceTotal, setDistanceTotal] = useState(0);
  const [activityTime, setActivityTime] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [post, setPost] = useState({
    title: "",
    content: "",
    distance: "",
    time: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/dashboard/createPost", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(post),
    });
    if (res.ok) {
      alert("post created");
    }
    console.log(post);
  };

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

  //Compare the positions. If a new postion then log that.
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

  // Custom icon for map. <a href="https://www.flaticon.com/free-icons/dot" title="dot icons">Dot icons created by iconixar - Flaticon</a>
  const customIcon = new Icon({
    iconUrl: recImage,
    iconSize: [30, 30],
  });

  useEffect(() => {
    if (isOpen) {
      setPost((prev) => ({
        ...prev,
        distance: distanceTotal,
        time: activityTime,
      }));
    }
  }, [isOpen]);

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
      <DrawerContext.Provider value={isOpen}>
        <Stopwatch setActivityTime={setActivityTime} setOpen={setIsOpen} />
        <ActivityDrawer>
          <>
            <h1>Create post</h1>
            <h2>
              {distanceTotal} {activityTime}
            </h2>
            <form onSubmit={(e) => handleSubmit(e)}>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={post.title}
                onChange={(e) =>
                  setPost((prev) => ({ ...prev, title: e.target.value }))
                }
              />
              <input
                type="text"
                name="body"
                placeholder="content"
                value={post.body}
                onChange={(e) =>
                  setPost((prev) => ({ ...prev, content: e.target.value }))
                }
              />
              <button type="submit" onClick={(e) => handleSubmit(e)}>
                POST
              </button>
            </form>
          </>
        </ActivityDrawer>
      </DrawerContext.Provider>
    </>
  );
}

export default Record;
