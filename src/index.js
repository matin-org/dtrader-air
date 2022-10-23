import React from "react";
import ReactDOM from "react-dom/client";
import App from "pages/main/App";
import "assets/css/global.scss";
import { DtraderAirProvider } from "store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <DtraderAirProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </DtraderAirProvider>
);
