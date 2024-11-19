import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import BestRecipes from "./BestRecipes";
import Home from "./Home";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
    {/* <BestRecipes /> */}
    {/* <Home /> */}
  </React.StrictMode>
);

reportWebVitals();
