import React from "react";
import System from "./pages/System";
import { StoreProvider } from "./contexts/Store";

function App() {
  return (
    <StoreProvider>
      <System />
    </StoreProvider>
  );
}

export default App;
