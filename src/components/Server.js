import React, { useContext } from "react";
import { StoreContext } from "../contexts/Store";

function Server({ id }) {
  const { dispatch } = useContext(StoreContext);

  return (
    <section className="server">
      <h2>Server #{id}</h2>
      <button
        className="button"
        onClick={() => dispatch({ type: "remove_server", payload: { id } })}
      >
        Remove Server
      </button>
      <button className="button">Add Tasks</button>
      <input type="number" />
      <p>List of tasks</p>
    </section>
  );
}

export default Server;
