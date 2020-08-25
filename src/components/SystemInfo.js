import React, { useContext } from "react";
import { StoreContext } from "../contexts/Store";

function SystemInfo() {
  const {
    data: { servers, taskQueue },
  } = useContext(StoreContext);
  const serversToBeDeleted = servers.filter(
    (server) => server.toBeRemoved === true
  );

  return (
    <div>
      <h2>Servers running: #{servers.length}</h2>
      <h2>Servers scheduled to be deleted: #{serversToBeDeleted.length} </h2>
      <h2>Tasks: #{taskQueue.length}</h2>
    </div>
  );
}

export default SystemInfo;
