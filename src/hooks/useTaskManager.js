import { useState, useEffect } from "react";
import shortId from "short-uuid";

function useTaskQueue() {
  const [servers, setServers] = useState([]);
  const [taskQueue, setTaskQueue] = useState([]);

  // initialize app
  useEffect(() => {
    if (servers.length === 0) {
      const newServer = {
        id: shortId.generate(),
        idle: true,
        toBeRemoved: false,
      };
      setServers((prevState) => [...prevState, newServer]);
    }
  }, [servers]);

  useEffect(() => {
    // everytime we modify servers/tasks state we will run this block
    // execute task if server is idle and we have a task pending
    const idleServer = servers.find(({ idle }) => idle === true);
    const taskToProcess = taskQueue.find((task) => !task.serverId);

    if (idleServer && taskToProcess) {
      taskToProcess.executeTask(taskToProcess.id, idleServer.id);
    }

    // remove any servers which were marked to be deleted
    const serverToBeRemoved = servers.find(({ toBeRemoved }) => toBeRemoved);
    if (serverToBeRemoved && serverToBeRemoved.idle) {
      removeServer(serverToBeRemoved.id);
    }
  }, [servers, taskQueue]);

  function changeServerIdleStatus(serverId, state) {
    setServers((prevState) =>
      prevState.map((server) => {
        if (server.id === serverId) {
          return { ...server, idle: state };
        }
        return server;
      })
    );
  }

  function markTaskAsRunning(taskId, serverId) {
    setTaskQueue((prevState) =>
      prevState.map((task) => {
        if (task.id === taskId) {
          return { ...task, running: true, serverId };
        }
        return task;
      })
    );
  }

  function addAServer() {
    // check if max servers reached
    if (servers.length >= 10) return; // can also setup error messages
    // add server
    const newServer = {
      id: shortId.generate(),
      idle: true,
      toBeRemoved: false,
    };
    setServers((prevState) => [...prevState, newServer]);
    return newServer;
  }

  function markAServerToBeRemoved() {
    // only proceed if we have minimum 1 servers available after remove server
    const availableServers = servers.filter(({ toBeRemoved }) => !toBeRemoved);
    if (availableServers.length >= 2) {
      // selete the first server to be removed as anyone is fine
      const { id: serverId } = availableServers[0];
      setServers((prevState) =>
        prevState.map((server) => {
          if (server.id === serverId) {
            return { ...server, toBeRemoved: true };
          }
          return server;
        })
      );
    }
  }

  function removeServer(serverId) {
    setServers((prevState) => prevState.filter(({ id }) => id !== serverId));
  }

  function executeTask(taskId, serverId) {
    // reserver server
    changeServerIdleStatus(serverId, false);
    // mark task as running
    markTaskAsRunning(taskId, serverId);
    setTimeout(() => {
      // handle post task completion
      // remove task from queue
      setTaskQueue((prevState) => prevState.filter(({ id }) => id !== taskId));
      // release server for other tasks
      changeServerIdleStatus(serverId, true);
    }, 20000);
  }

  function addTask(numberOfTasks = 1) {
    const tasksToBeAdded = [];

    for (let i = 0; i < numberOfTasks; i++) {
      const newTask = {
        id: shortId.generate(),
        running: false,
        serverId: null,
        executeTask,
      };
      tasksToBeAdded.push(newTask);
    }
    // add to task queue
    setTaskQueue([...taskQueue, ...tasksToBeAdded]);
  }

  function removeTask(taskId) {
    // find the task to remove and make sure its not running
    const taskToRemove = taskQueue.find(
      ({ id, running }) => id === taskId && !running
    );
    if (taskToRemove) {
      setTaskQueue((prevState) =>
        prevState.filter(({ id }) => id !== taskToRemove.id)
      );
    }
  }

  return {
    addTask,
    addAServer,
    markAServerToBeRemoved,
    removeTask,
    data: { servers, taskQueue },
  };
}

export default useTaskQueue;
