import React, { useState, useEffect, useContext } from "react";
import deleteIcon from "../assets/deleteIcon.png";
import { StoreContext } from "../contexts/Store";

function Task({ id, running }) {
  const [time, setTime] = useState(0);

  const { removeTask } = useContext(StoreContext);

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
        <p>{!running ? "waiting" : `00.${time}`}</p>
      </div>
      {!running && (
        <div className="task-delete">
          <img alt="delete" src={deleteIcon} onClick={() => removeTask(id)} />
        </div>
      )}
    </div>
  );
}

export default Task;
