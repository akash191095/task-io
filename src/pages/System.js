import React, { useContext, useEffect, useState } from "react";
import Servers from "../components/Servers";
import { StoreContext } from "../contexts/Store";
import TaskQueue from "../components/TaskQueue";

function System() {
  const { state, dispatch } = useContext(StoreContext);
  const { activeServers } = state;
  const maxServersReached = activeServers === 10 ? true : false;
  const minServerReached = activeServers === 1 ? true : false;

  const [taskInput, setTaskInput] = useState(0);

  // Initialize the system
  useEffect(() => {
    dispatch({ type: "add_server" });
  }, [dispatch]);

  function addTask() {
    dispatch({ type: "add_task" });
  }

  return (
    <main>
      <h1>System - Task Manager</h1>
      <button
        className="button"
        onClick={() => dispatch({ type: "add_server" })}
        disabled={maxServersReached}
      >
        Add Server
      </button>
      <button
        className="button"
        onClick={() => dispatch({ type: "mark_remove_server" })}
        disabled={minServerReached}
      >
        Remove Server
      </button>
      <button className="button" onClick={addTask}>
        Add Tasks
      </button>
      <input
        type="number"
        className="add-task__input"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
      />
      <TaskQueue />
      <Servers />
    </main>
  );
}

export default System;
