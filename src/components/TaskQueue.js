import React, { useContext, useEffect } from "react";
import { StoreContext } from "../contexts/Store";
import Task from "./Task";

function TaskQueue() {
  const { state, dispatch } = useContext(StoreContext);
  const { servers, tasks } = state;

  useEffect(() => {
    // Process Servers
    const serverToRemove = servers.find((server) => server.toBeRemoved);
    if (serverToRemove && !serverToRemove.active) {
      dispatch({ type: "remove_server", payload: { id: serverToRemove.id } });
    }

    // Process Tasks
    if (tasks.length <= 0) return; // only proceed if we have tasks to process
    // get a task to process
    const taskToProcess = tasks.find((task) => !task.running);
    // get a server which is not active
    const idleServer = servers.find(
      (server) => !server.active && !server.toBeRemoved
    );
    // process the task
    if (idleServer && taskToProcess) {
      dispatch({
        type: "start_task",
        payload: { serverId: idleServer.id, id: taskToProcess.id },
      });
      // remove the task after a certain time
      setTimeout(() => {
        dispatch({ type: "remove_task", payload: { id: taskToProcess.id } });
      }, 20000);
    }
  }, [servers, tasks, dispatch]);

  return (
    <div>
      {tasks.map(({ id, running }) => (
        <article key={id}>
          <Task running={running} id={id} />
        </article>
      ))}
    </div>
  );
}

export default TaskQueue;
