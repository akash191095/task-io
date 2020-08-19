import React, { useReducer } from "react";
import shortId from "short-uuid";

const initialState = {
  servers: [],
  serversToRemove: [],
  tasks: [],
};

const StoreContext = React.createContext(initialState);

function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

let reducer = (state, action) => {
  switch (action.type) {
    case "add_server": {
      return {
        ...state,
        servers: [
          ...state.servers,
          { id: shortId.generate(), active: false, toBeRemoved: false },
        ],
        activeServers: state.activeServers + 1,
      };
    }
    case "mark_remove_server": {
      let newServers = state.servers;
      const avaiableServers = state.servers.filter((server) => {
        if (server.active && server.toBeRemoved) return false;
        return true;
      });
      // only proceed if we have more than 1 servers
      if (avaiableServers.length > 1) {
        // find a server which is not already in the list
        const findAServerToRemove = state.servers.find(
          (server) => !server.toBeRemoved
        );
        if (findAServerToRemove) {
          newServers = state.servers.map((server) => {
            if (server.id === findAServerToRemove.id) {
              return { ...server, toBeRemoved: true };
            } else return server;
          });
        }
      }
      return { ...state, servers: newServers };
    }
    case "remove_server": {
      // only proceed if we have more than 1 servers
      if (state.servers.length <= 1) return state;
      const { id } = action.payload;
      const newServers = state.servers.filter((server) => server.id !== id);
      return {
        ...state,
        servers: newServers,
      };
    }
    case "add_task": {
      const newTasks = [];
      const { number = 1 } = action.payload;
      for (let i = 0; i < number; i++) {
        newTasks.push({
          id: shortId.generate(),
          running: false,
          serverId: null,
        });
      }
      return {
        ...state,
        tasks: [...state.tasks, ...newTasks],
      };
    }
    case "start_task": {
      const { id, serverId } = action.payload;
      const servers = state.servers.map((server) => {
        if (server.id === serverId) {
          return { ...server, active: true };
        }
        return server;
      });
      const tasks = state.tasks.map((task) => {
        if (task.id === id) {
          return { ...task, running: true, serverId };
        }
        return task;
      });
      return { ...state, tasks, servers };
    }
    case "remove_task": {
      const { id } = action.payload;
      const taskToRemove = state.tasks.find((task) => task.id === id);
      const servers = state.servers.map((server) => {
        if (server.id === taskToRemove.serverId) {
          return { ...server, active: false };
        }
        return server;
      });
      const tasks = state.tasks.filter((task) => task.id !== taskToRemove.id);
      return { ...state, tasks, servers };
    }
    default:
      return state;
  }
};

export { StoreContext, StoreProvider };
