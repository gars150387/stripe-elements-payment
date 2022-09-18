import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { StytchProvider, initStytch } from "@stytch/stytch-react";
import { BrowserRouter as Router } from "react-router-dom";

const stytch = initStytch(
  "public-token-test-02b5e567-7840-482e-b91b-5867f1e1ddc7"
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StytchProvider stytch={ stytch }>
      <Router>
        <App />
      </Router>
    </StytchProvider>
  </React.StrictMode>
);
