import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";

const isDev = import.meta.env.MODE === "development";
const PUBLISHABLE_KEY = isDev ? import.meta.env.VITE_CLERK_PUBLISHABLE_KEY : null;

if (isDev && !PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file for development");
}

// Mount App differently based on environment
const root = createRoot(document.getElementById("root"));

if (isDev && PUBLISHABLE_KEY) {
  // ✅ Only load Clerk in development
  root.render(
    <StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ClerkProvider>
    </StrictMode>
  );
} else {
  // 🚫 Skip Clerk in production
  root.render(
    
      <BrowserRouter>
        <App />
      </BrowserRouter>
    
  );
}
