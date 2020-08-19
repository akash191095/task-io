import React, { useContext, useEffect } from "react";
import Server from "../components/Server";
import { StoreContext } from "../contexts/Store";

function System() {
  const { state, dispatch } = useContext(StoreContext);
  const { servers, activeServers } = state;
  const maxServersReached = activeServers === 10 ? true : false;

  // Initialize the system
  useEffect(() => {
    dispatch({ type: "add_server" });
  }, []);

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
      <section className="servers">
        {servers.map(({ id }) => (
          <Server id={id} key={id} />
        ))}
      </section>
    </main>
  );
}

export default System;
