
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { publicRoutes, dashboardRoutes } from './routes';
import { RouteErrorBoundary } from '@/components/error-boundary/RouteErrorBoundary';

const router = createBrowserRouter([
  ...publicRoutes,
  ...dashboardRoutes
].map(route => ({
  ...route,
  errorElement: <RouteErrorBoundary />
})));

function App() {
  return <RouterProvider router={router} />;
}

export default App;
