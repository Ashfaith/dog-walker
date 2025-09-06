import { useState, useEffect, useRef } from "react";
import { FaPlay, FaStop, FaPause } from "react-icons/fa";

const Stopwatch = ({ setActivityTime, setOpen, distance }) => {
  const [started, setStarted] = useState(false);

  const start = useRef(null);

  // state to store time
  const [time, setTime] = useState(0);

  // state to check stopwatch running or not
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    console.log("start:", start.current);
    let delta = setInterval(() => {
      setTime(Date.now() - start.current);
    }, 1000);
    console.log(time);

    return () => clearInterval(delta);
  }, [isRunning]);

  // Hours calculation
  const hours = Math.floor(time / 3600000);

  // Minutes calculation
  const minutes = Math.floor(time / 60000);

  // Seconds calculation
  const seconds = Math.floor(time / 1000);

  // Method to start and stop timer
  const startAndPause = () => {
    if (!started) {
      setStarted(true);
      start.current = Date.now();
    }
    isRunning === fasle ? setIsRunning(true) : setIsRunning(false);
  };

  const handleStop = () => {
    const finalTime = `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
    setActivityTime(finalTime);
    setOpen(true);
  };

  return (
    <div className="stopwatch-container">
      <p className="stopwatch-time">
        {hours}:{minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </p>

      <div className="stopwatch-buttons">
        {!started ? (
          <button className="stopwatch-button play" onClick={startAndPause}>
            <FaPlay />
          </button>
        ) : (
          <>
            <button
              className={`stopwatch-button ${!isRunning ? "slide-left play" : "pause"}`}
              onClick={startAndPause}
            >
              {!isRunning ? <FaPlay /> : <FaPause />}
            </button>

            <button
              className={`stopwatch-button stop ${!isRunning ? "slide-right" : ""}`}
              onClick={handleStop}
            >
              <FaStop />
            </button>
          </>
        )}
      </div>

      <p className="distance">{distance.toFixed(2)}km</p>
    </div>
  );
};

export default Stopwatch;
