import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { UserProvider } from "./js/contexts/user.context.jsx";
import { InvoicesProvider } from "./js/contexts/invoices.context.jsx";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <InvoicesProvider>
          <App />
        </InvoicesProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
