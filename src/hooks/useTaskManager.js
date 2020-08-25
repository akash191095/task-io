import { useState, useCallback } from "react";
import shortId from "short-uuid";

function addItem(items, newItem) {
  return [...items, newItem];
}

function modifyItem(items, idToModify, dataToChange) {
  return items.map((item) => {
    if (item.id === idToModify) {
      return { ...item, ...dataToChange };
    }
    return item;
  });
}

function useTaskManager() {
  const [servers, setServers] = useState([]);
  const [taskQueue, setTaskQueue] = useState([]);

  const addAServer = useCallback(() => {
    // add server
    const newServer = {
      id: shortId.generate(),
      idle: true,
      toBeRemoved: false,
      taskRunning: null,
    };
    setServers((prevState) => addItem(prevState, newServer));
  }, []);

  function markAServerToBeRemoved() {
    // only proceed if we have minimum 1 server available after removing server
    const availableServers = servers.filter(({ toBeRemoved }) => !toBeRemoved);
    if (availableServers.length >= 2) {
      // select the first server to be removed as anyone is fine
      const { id: serverId } = availableServers[0];
      // make the server to be removed
      setServers((prevState) =>
        modifyItem(prevState, serverId, { toBeRemoved: true })
      );
    }
  }

  function removeServer(serverId) {
    setServers((prevState) => prevState.filter(({ id }) => id !== serverId));
  }

  function addTask(numberOfTasks = 1) {
    const tasksToBeAdded = [];

    for (let i = 0; i < numberOfTasks; i++) {
      const newTask = {
        id: shortId.generate(),
        running: false,
        serverId: null,
      };
      tasksToBeAdded.push(newTask);
    }
    // add to task queue
    setTaskQueue([...taskQueue, ...tasksToBeAdded]);
  }

  async function executeTask(task, server) {
    // reserve server
    setServers((prevState) =>
      modifyItem(prevState, server.id, { idle: false, taskRunning: task })
    );
    // mark task as running
    setTaskQueue((prevState) =>
      modifyItem(prevState, task.id, { running: true })
    );
    await new Promise((resolve) => {
      setTimeout(resolve, 20000);
    });
    // handle post task completion
    // remove task from queue
    setTaskQueue((prevState) => prevState.filter(({ id }) => id !== task.id));
    // release server for other tasks
    setServers((prevState) =>
      modifyItem(prevState, server.id, { idle: true, taskRunning: null })
    );
  }

  function removeTask(taskId) {
    // find the task to remove
    const taskToRemove = taskQueue.find(({ id }) => id === taskId);
    if (taskToRemove.running) {
      // send error if its running
      return { error: "cannot remove task while its running" };
    } else if (!taskToRemove.running) {
      // remove from queue
      setTaskQueue((prevState) =>
        prevState.filter(({ id }) => id !== taskToRemove.id)
      );
    }
  }

  function fetchATaskToProcess() {
    return taskQueue.find((task) => !task.running && !task.serverId);
  }

  return {
    addTask,
    addAServer,
    markAServerToBeRemoved,
    removeTask,
    fetchATaskToProcess,
    executeTask,
    removeServer,
    data: { servers, taskQueue },
  };
}

export default useTaskManager;
