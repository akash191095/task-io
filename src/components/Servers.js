import React, { useContext } from "react";
import { StoreContext } from "../contexts/Store";

function Servers() {
  const { state } = useContext(StoreContext);
  const { servers } = state;
  return (
    <section className="server">
      {servers.map(({ id }) => (
        <h2 key={id}>Server #{id}</h2>
      ))}
    </section>
  );
}

export default Servers;
