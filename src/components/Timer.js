import { useState, useEffect } from "react";

export default function Timer() {
  const [minutes, setMinutes] = useState("");
  const [isClick, setIsClick] = useState(false);
  const [timer, setTimer] = useState("00:00");
  const [errorMessage, setErrorMessage] = useState("");

  const startTimer = (minutes) => {
    const endTime = new Date();
    endTime.setMinutes(endTime.getMinutes() + parseInt(minutes, 10));

    const intervalId = setInterval(() => {
      let { total, minutes, seconds } = getTimeRemaining(endTime);
      if (total >= 0) {
        setTimer(
          `${minutes > 9 ? minutes : "0" + minutes}:${
            seconds > 9 ? seconds : "0" + seconds
          }`
        );
      } else {
        clearInterval(intervalId);
      }
    }, 1000);
  };

  const getTimeRemaining = (endTime) => {
    const total = endTime - new Date();
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return {
      total,
      minutes,
      seconds,
    };
  };

  const handleStart = () => {
    if (minutes === "" || parseInt(minutes, 10) > 120) {
      setErrorMessage("Please enter a valid number up to 120 minutes.");
      return;
    }

    startTimer(minutes);
    setIsClick(true);
    setErrorMessage(""); // Clear error message when timer starts
  };

  const handleInputChange = (event) => {
    setMinutes(event.target.value);
    setErrorMessage(""); // Clear error message when input changes
  };
  useEffect(() => {
    if (timer === "00:00") {
      setIsClick(false);
    }
  }, [timer]);

  return (
    <div className="flex gap-5">
      {isClick ? (
        <h2 className="w-28">{timer}</h2>
      ) : (
        <div className="flex gap-3">
          <input
            className="w-24 text-black rounded-2xl border-none pl-9"
            type="number"
            value={minutes}
            onChange={handleInputChange}
            placeholder="M"
          />
          <button onClick={handleStart}>Start</button>
        </div>
      )}
      <audio src="../timer.mp3"></audio>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}{" "}
      {/* Show error message if it exists */}
    </div>
  );
}
