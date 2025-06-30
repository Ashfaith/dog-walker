import { useStopwatch } from "react-timer-hook";

function MyStopwatch({ setActivityTime }) {
  const { seconds, minutes, hours, isRunning, start, pause, reset } =
    useStopwatch({ autoStart: true, interval: 20 });

  const handleStop = () => {
    const finalTime = `${hours}:${minutes}:${seconds}`;
    setActivityTime(finalTime);
    console.log("Time sent to parent:", finalTime);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>react-timer-hook</h1>
      <p>Stopwatch Demo</p>
      <div style={{ fontSize: "100px" }}>
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <p>{isRunning ? "Running" : "Not running"}</p>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={reset}>Reset</button>
      <button onClick={handleStop}>Stop</button>
    </div>
  );
}

export default MyStopwatch;
