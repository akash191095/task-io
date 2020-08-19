import React, { useState, useEffect } from "react";

function Task({ running }) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (running) {
      const timer = setInterval(() => {
        setTime((prevState) => prevState + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [running]);

  return (
    <div className="task">
      <span style={{ width: `${time * 5}%` }}></span>
      <div className="task-details">
        <p>{!running ? "waiting" : `0.0${time}`}</p>
      </div>
    </div>
  );
}

export default Task;
