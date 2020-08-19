import React from "react";
import System from "./pages/System";
import { StoreProvider } from "./contexts/Store";
import "./styles/app.css";
import "./styles/components.css";

function App() {
  return (
    <StoreProvider>
      <div className="app">
        <System />
      </div>
    </StoreProvider>
  );
}

export default App;
