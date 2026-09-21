import "bootstrap/dist/css/bootstrap.min.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import { AppProviders } from './app/providers';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <AppProviders /> */}
    <div>Teste</div>
  </StrictMode>,
);
