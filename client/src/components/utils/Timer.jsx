import { useState, useEffect } from "react";
import { FaPlay, FaStop, FaPause } from "react-icons/fa";

const Stopwatch = ({ setActivityTime, setOpen, distance }) => {
  const [started, setStart] = useState(false);

  // state to store time
  const [time, setTime] = useState(0);

  // state to check stopwatch running or not
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  // Hours calculation
  const hours = Math.floor(time / 360000);

  // Minutes calculation
  const minutes = Math.floor((time % 360000) / 6000);

  // Seconds calculation
  const seconds = Math.floor((time % 6000) / 100);

  // Method to start and stop timer
  const startAndPause = () => {
    if (!started) {
      setStart(true);
    }
    setIsRunning(!isRunning);
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
        <button  className= "stopwatch-button play" onClick={startAndPause}>
          <FaPlay />
        </button> 
          ) : (
            <>
        <button  className={`stopwatch-button ${!isRunning ? "slide-left play" : "pause"}`} onClick={startAndPause}>
          {!isRunning ? <FaPlay /> : <FaPause />}
        </button>
          
        <button className={`stopwatch-button stop ${!isRunning ? "slide-right" : ""}`} onClick={handleStop}>
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
