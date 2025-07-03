import { useState, useEffect } from "react";

const Stopwatch = ({ setActivityTime, setOpen }) => {
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
    setIsRunning(!isRunning);
  };

  const handleStop = () => {
    const finalTime = `${hours}:${minutes}:${seconds}`;
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
        <button className="stopwatch-button" onClick={startAndPause}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button className="stopwatch-button" onClick={handleStop}>
          Stop
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
