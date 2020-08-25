import React, { useContext, useState, useEffect } from "react";
import Servers from "../components/Servers";
import { StoreContext } from "../contexts/Store";
import SystemInfo from "../components/SystemInfo";
import TaskQueue from "../components/TaskQueue";

function System() {
  const {
    addAServer,
    addTask,
    markAServerToBeRemoved,
    data: { servers },
  } = useContext(StoreContext);

  const maxServersReached = servers.length === 10 ? true : false;
  const avaiableServers = servers.filter((server) => {
    if (!server.idle && server.toBeRemoved) return false;
    return true;
  });
  const minServerReached = avaiableServers.length === 1 ? true : false;
  const [taskInput, setTaskInput] = useState(1);

  useEffect(() => {
    // initialize the system with 1 server running
    addAServer();
  }, [addAServer]);

  return (
    <main>
      <h1>System - Task Manager</h1>
      <button
        className="button"
        onClick={addAServer}
        disabled={maxServersReached}
      >
        Add Server
      </button>
      <button
        className="button"
        onClick={markAServerToBeRemoved}
        disabled={minServerReached}
      >
        Remove Server
      </button>
      <button className="button" onClick={() => addTask(taskInput)}>
        Add Tasks
      </button>
      <input
        type="number"
        className="add-task__input"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
      />
      <SystemInfo />
      <Servers />
      <TaskQueue />
    </main>
  );
}

export default System;
