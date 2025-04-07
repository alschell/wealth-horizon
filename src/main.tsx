
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find the root element");
}

const root = createRoot(rootElement);

// Make sure the entire app is wrapped in React
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
