import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import CurrencyConvertorCtx from "./context/currencyConvertor/provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <CurrencyConvertorCtx>
        <App />
      </CurrencyConvertorCtx>
    </BrowserRouter>
  </StrictMode>,
);
