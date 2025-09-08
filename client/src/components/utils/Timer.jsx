import { useState, useEffect, useRef } from "react";
import { FaPlay, FaStop, FaPause } from "react-icons/fa";

const Stopwatch = ({ setActivityTime, setOpen, distance }) => {
  const [started, setStarted] = useState(false);
  // state to store time
  const [time, setTime] = useState(0);
  // state to check stopwatch running or not
  const [isRunning, setIsRunning] = useState(null);

  const start = useRef(null);
  const pauseStart = useRef(null);
  const totalPause = useRef(0);

  useEffect(() => {
    let delta;

    if (isRunning && started) {
      delta = setInterval(() => {
        const now = Date.now();
        const elapsed = now - start.current - totalPause.current;
        setTime(elapsed);
      }, 1000);
    }

    return () => clearInterval(delta);
  }, [isRunning, started]);

  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);

  const startAndPause = () => {
    if (!started) {
      setStarted(true);
      start.current = Date.now();
      setIsRunning(true);
    } else if (isRunning) {
      pauseStart.current = Date.now();
      setIsRunning(false);
    } else {
      const pauseDuration = Date.now() - pauseStart.current;
      totalPause.current += pauseDuration;
      setIsRunning(true);
    }
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
