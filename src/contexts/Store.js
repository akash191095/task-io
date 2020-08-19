import React, { useReducer } from "react";

const initialState = {
  servers: [],
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
      const { id } = action.payload;
      return { ...state, servers: [...state.servers, { id }] };
    }
    case "remove_server": {
      const { id } = action.payload;
      const newServers = state.servers.filter((server) => server.id === id);
      return { ...state, servers: newServers };
    }
    default:
      return;
  }
};

export { StoreContext, StoreProvider };
