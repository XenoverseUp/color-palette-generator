import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import router from "@/router";

import "@/index.css";

const root = document.getElementById("root")!;

createRoot(root).render(
  <StrictMode>
    <RouterProvider {...{ router }} />
  </StrictMode>,
);