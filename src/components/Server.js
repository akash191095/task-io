import React from "react";

function Server({ id }) {
  return (
    <section className="server">
      <h2>Server #{id}</h2>
      <button>Remove Server</button>
      <button>Add Tasks</button>
      <input type="number" />
      <p>List of tasks</p>
    </section>
  );
}

export default Server;
