import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { UserProvider } from "./context/User.jsx";
import { LoadingProvider } from "./context/Loading.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <LoadingProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LoadingProvider>
    </UserProvider>
  </StrictMode>
);
