import { useContext, useEffect } from "react";
import { StoreContext } from "../contexts/Store";

function ServerItem({ server }) {
  const { executeTask, fetchATaskToProcess, removeServer } = useContext(
    StoreContext
  );

  useEffect(() => {
    if (server.idle && server.toBeRemoved) {
      removeServer(server.id);
      return;
    }
    if (server.idle && !server.toBeRemoved) {
      // fetch a task and process it
      const taskToProcess = fetchATaskToProcess();
      if (taskToProcess) {
        executeTask(taskToProcess, server);
      }
    }
  }, [server, executeTask, fetchATaskToProcess, removeServer]);

  return null;
}

export default ServerItem;
