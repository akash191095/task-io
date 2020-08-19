import React, { useReducer } from "react";
import shortId from "short-uuid";

const initialState = {
  servers: [],
  activeServers: 0,
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
        servers: [...state.servers, { id: shortId.generate() }],
        activeServers: state.activeServers + 1,
      };
    }
    case "remove_server": {
      const { id } = action.payload;
      const newServers = state.servers.filter((server) => server.id != id);
      return {
        ...state,
        servers: newServers,
        activeServers: state.activeServers - 1,
      };
    }
    default:
      return;
  }
};

export { StoreContext, StoreProvider };