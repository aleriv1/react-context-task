import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppNormalReducer from "./components/App/AppNormalReducer";
import App from "./components/App/App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    {/* <AppNormalReducer /> */}
  </StrictMode>,
);
