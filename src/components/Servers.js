import React, { useContext } from "react";
import { StoreContext } from "../contexts/Store";

function Servers() {
  const { state } = useContext(StoreContext);
  const { servers } = state;
  const serversToBeDeleted = servers.filter(
    (server) => server.toBeRemoved === true
  );
  return (
    <div>
      <h2>Servers running: #{servers.length}</h2>
      <h2>Servers scheduled to be deleted: #{serversToBeDeleted.length} </h2>
    </div>
  );
}

export default Servers;
