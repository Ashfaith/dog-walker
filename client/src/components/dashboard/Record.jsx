import { useState, useEffect, createContext, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "../../assets/leaflet.css";
import "./record.css";
import { FaRegCircle } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa6";
import Stopwatch from "../utils/Timer";
import ActivityDrawer from "../utils/ActivityDrawer";
import { convertToKm } from "../utils/helpers";
import { renderToString } from "react-dom/server";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/images/marker-icon-2x.png",
  iconUrl: "/images/marker-icon.png",
  shadowUrl: "/images/marker-shadow.png",
});

export const DrawerContext = createContext(null);

function ChangeLocation(location) {
  console.log("lat", location.location.lat);
  const map = useMap();
  useEffect(() => {
    map.setView([location.location.lat, location.location.lng]);
  }, [location]);

  return null;
}

function Record() {
  const [activityTime, setActivityTime] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [post, setPost] = useState({
    title: "",
    content: "",
    distance: "",
    time: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/dashboard/createPost`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(post),
      }
    );
    if (res.ok) {
      alert("post created");
    }
  };

  const [currentPos, setCurrentPos] = useState(null);

  useEffect(() => {
    const success = (position) => {
      setCurrentPos(
        L.latLng(position.coords.latitude, position.coords.longitude)
      );
    };

    const error = (err) => {
      console.error("Geolocation error:", err);
      L.latLng(null, null);
    };

    const options = {
      enableHighAccuracy: true,
    };

    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        success,
        error,
        options
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      console.warn("Geolocation not available.");
    }
  }, []);

  const lastPos = useRef(null);
  const [distanceTotal, setDistanceTotal] = useState(0);
  const [historicalPos, setHistoricalPos] = useState([]);

  useEffect(() => {
    console.log(isRecording);
    if (!currentPos || !isRecording) return;

    if (lastPos.current === null) {
      lastPos.current = currentPos;
      return;
    }

    const distanceDelta = lastPos.current.distanceTo(currentPos);
    const convertedDelta = convertToKm(distanceDelta);

    if (convertedDelta < 0.01) return;

    setDistanceTotal((prev) => prev + Number(convertedDelta.toFixed(2)));
    setHistoricalPos((prev) => [currentPos, ...prev]);
    lastPos.current = currentPos;
  }, [currentPos]);

  const topIcon = L.divIcon({
    className: "",
    html: renderToString(<FaCircle className="top-icon" />),
  });

  const bottomIcon = L.divIcon({
    className: "",
    html: renderToString(<FaRegCircle className="bottom-icon" size={30} />),
    iconSize: [32, 32],
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
      {console.log(currentPos)}
      {!currentPos ? (
        <p>fetching location</p>
      ) : (
        <MapContainer center={currentPos} zoom={17}>
          <TileLayer
            url={`${import.meta.env.VITE_API_URL}/dashboard/map/{z}/{x}/{y}`}
            attribution='<a href="https://www.jawg.io?utm_medium=map&utm_source=attribution" target="_blank">&copy; Jawg</a> - <a href="https://www.openstreetmap.org?utm_medium=map-attribution&utm_source=jawg" target="_blank">&copy; OpenStreetMap</a>&nbsp;contributors'
          />
          <ChangeLocation location={currentPos} />
          <Marker className="top-icon" position={currentPos} icon={topIcon} />
          <Marker
            className="bottom-icon"
            position={currentPos}
            icon={bottomIcon}
          />
          <Polyline positions={historicalPos} />
        </MapContainer>
      )}
      <DrawerContext.Provider value={{ isOpen, setIsOpen }}>
        <Stopwatch
          setActivityTime={setActivityTime}
          setOpen={setIsOpen}
          distance={distanceTotal}
          recording={setIsRecording}
        />
        <ActivityDrawer>
          <>
            <div className="header-container">
              <h3>Latest Activity</h3>
            </div>

            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="title-cont">
                <input
                  className="activity-title"
                  type="text"
                  name="title"
                  placeholder="Name your walk"
                  value={post.title}
                  onChange={(e) =>
                    setPost((prev) => ({ ...prev, title: e.target.value }))
                  }
                  required
                />
              </div>

              <div className="stats-container">
                <div className="distance-cont">
                  <p>Distance</p>
                  <h4>{distanceTotal}km</h4>
                </div>
                <div className="time-cont">
                  <p>Time: </p>
                  <h4>{activityTime}</h4>
                </div>
              </div>

              <div className="button-container">
                <button type="submit">Save Activity</button>
              </div>
            </form>
          </>
        </ActivityDrawer>
      </DrawerContext.Provider>
    </>
  );
}

export default Record;
