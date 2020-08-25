import React from "react";
import useTaskManager from "../hooks/useTaskManager";

const initialState = {};

const StoreContext = React.createContext(initialState);

function StoreProvider({ children }) {
  const {
    addAServer,
    addTask,
    markAServerToBeRemoved,
    removeTask,
    fetchATaskToProcess,
    executeTask,
    removeServer,
    data,
  } = useTaskManager();
  return (
    <StoreContext.Provider
      value={{
        addAServer,
        addTask,
        markAServerToBeRemoved,
        removeTask,
        fetchATaskToProcess,
        executeTask,
        removeServer,
        data,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export { StoreContext, StoreProvider };
