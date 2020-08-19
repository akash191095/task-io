import React, { useContext, useEffect } from "react";
import Server from "../components/Server";
import { StoreContext } from "../contexts/Store";

function System() {
  const { state, dispatch } = useContext(StoreContext);
  const { servers } = state;

  // Initialize the system
  useEffect(() => {
    dispatch({ type: "add_server", payload: { id: 1 } });
  }, []);

  return (
    <main>
      {servers.map(({ id }) => (
        <Server id={id} key={id} />
      ))}
    </main>
  );
}

export default System;
