import React, { useContext } from "react";
import { StoreContext } from "../contexts/Store";

function Server({ id }) {
  const { state, dispatch } = useContext(StoreContext);
  const { activeServers } = state;

  const minServerReached = activeServers === 1 ? true : false;

  return (
    <section className="server">
      <h2>Server #{id}</h2>
      <button
        className="button"
        onClick={() => dispatch({ type: "remove_server", payload: { id } })}
        disabled={minServerReached}
      >
        Remove Server
      </button>
      <p>List of tasks</p>
    </section>
  );
}

export default Server;
