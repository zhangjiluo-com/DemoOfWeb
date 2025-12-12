import { StrictMode } from "react";
import { RouterProvider } from "@tanstack/react-router";
import router from "./routes";

export default function App() {
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
