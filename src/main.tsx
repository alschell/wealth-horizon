
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

console.log("Starting application...");

const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Failed to find the root element");
  throw new Error("Failed to find the root element");
}

console.log("Root element found:", rootElement);

const root = createRoot(rootElement);

// Make sure the entire app is wrapped in React and BrowserRouter
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

console.log("Finished mounting application");
