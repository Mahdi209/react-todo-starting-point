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
          `${minutes > 9 ? minutes : "0" + minutes}:${seconds > 9 ? seconds : "0" + seconds
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
    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
      {isClick ? (
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-indigo-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="font-mono text-xl font-semibold text-indigo-900 
                         min-w-[80px] text-center">
            {timer}
          </h2>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              className="w-20 sm:w-24 px-3 py-2 text-center
                         border-2 border-indigo-200 rounded-lg
                         focus:outline-none focus:border-indigo-400 
                         focus:ring-2 focus:ring-indigo-200
                         text-indigo-900 placeholder-indigo-300"
              type="number"
              min="1"
              max="120"
              value={minutes}
              onChange={handleInputChange}
              placeholder="Min"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 
                            text-sm text-indigo-400">
              min
            </span>
          </div>
          <button
            onClick={handleStart}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg
                       hover:bg-indigo-600 active:bg-indigo-700
                       transition-colors duration-200
                       flex items-center gap-2 whitespace-nowrap"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="hidden sm:inline">Start</span>
          </button>
        </div>
      )}

      <audio src="../timer.mp3" />

      {errorMessage && (
        <div className="absolute left-0 -bottom-6 w-full">
          <p className="text-rose-500 text-sm flex items-center gap-1">
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{errorMessage}</span>
          </p>
        </div>
      )}
    </div>
  );
}
