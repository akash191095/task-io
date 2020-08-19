import React, { useContext, useEffect, useState } from "react";
import Servers from "../components/Servers";
import { StoreContext } from "../contexts/Store";

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
        onClick={() => dispatch({ type: "remove_server" })}
        disabled={minServerReached}
      >
        Remove Server
      </button>
      <button className="button">Add Tasks</button>
      <input
        type="number"
        className="add-task__input"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
      />
      <Servers />
    </main>
  );
}

export default System;
