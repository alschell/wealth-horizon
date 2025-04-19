
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

try {
  const root = createRoot(rootElement);

  // Make sure the entire app is wrapped in React and BrowserRouter
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  console.log("Finished mounting application");
} catch (error) {
  console.error("Critical error during application initialization:", error);
  // Display a basic error message when React fails to mount
  rootElement.innerHTML = `
    <div style="padding: 20px; text-align: center; font-family: sans-serif;">
      <h2>Application Error</h2>
      <p>Sorry, the application failed to load. Please try refreshing the page.</p>
      <button onclick="window.location.reload()">Refresh Page</button>
    </div>
  `;
}
