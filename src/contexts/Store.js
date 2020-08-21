import React from "react";
import useTaskQueue from "../hooks/useTaskManager";

const initialState = {};

const StoreContext = React.createContext(initialState);

function StoreProvider({ children }) {
  const {
    addAServer,
    addTask,
    markAServerToBeRemoved,
    removeTask,
    data,
  } = useTaskQueue();
  return (
    <StoreContext.Provider
      value={{ addAServer, addTask, markAServerToBeRemoved, removeTask, data }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export { StoreContext, StoreProvider };
