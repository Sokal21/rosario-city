import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ResourceProvider } from "providers/ResourceProvider.tsx";
import { EmpireProvider } from "providers/EmpireProvider.tsx";

import "./main.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ResourceProvider>
      <EmpireProvider>
        <App />
      </EmpireProvider>
    </ResourceProvider>
  </React.StrictMode>
);
