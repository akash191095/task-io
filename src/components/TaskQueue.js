import React, { useContext } from "react";
import { StoreContext } from "../contexts/Store";
import Task from "./Task";

function TaskQueue() {
  const {
    data: { taskQueue },
  } = useContext(StoreContext);

  return (
    <div className="tasks-container">
      {taskQueue.map(({ id, running }) => (
        <article key={id}>
          <Task running={running} id={id} />
        </article>
      ))}
    </div>
  );
}

export default TaskQueue;
