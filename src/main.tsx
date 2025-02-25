import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ElfsightChat from "./pages/ElfsightChat.tsx"; // Import Chat Component

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <ElfsightChat /> {/* Place at the root level */}
  </React.StrictMode>
);
