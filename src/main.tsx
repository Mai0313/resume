import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import geistLatinUrl from "@fontsource-variable/geist/files/geist-latin-wght-normal.woff2?url";

import App from "./App.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";

import { getBasename } from "@/utils/pathUtils";

import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "@/styles/globals.css";

// Preload the primary Latin Geist weight so the LCP heading paints in-brand
// without a swap round-trip. The ?url import resolves to the same hashed,
// base-aware asset the font CSS requests, so this adds no extra download.
const fontPreload = document.createElement("link");

fontPreload.rel = "preload";
fontPreload.as = "font";
fontPreload.type = "font/woff2";
fontPreload.href = geistLatinUrl;
fontPreload.crossOrigin = "anonymous";
document.head.appendChild(fontPreload);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter basename={getBasename()}>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
);
