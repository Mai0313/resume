import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";

import { getBasename } from "@/utils/pathUtils";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "@/styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter basename={getBasename()}>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
);
