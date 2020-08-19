import React, { useContext, useEffect, useState } from "react";
import Server from "../components/Server";
import { StoreContext } from "../contexts/Store";

function System() {
  const { state, dispatch } = useContext(StoreContext);
  const { servers, activeServers } = state;
  const maxServersReached = activeServers === 10 ? true : false;

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
      <button className="button">Add Tasks</button>
      <input
        type="number"
        className="add-task__input"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
      />
      <section className="servers">
        {servers.map(({ id }) => (
          <Server id={id} key={id} />
        ))}
      </section>
    </main>
  );
}

export default System;
