import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { usersApi } from "./api";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";

ReactDOM.render(
  <React.StrictMode>
    <ApiProvider api={usersApi}>
        <App />
    </ApiProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
