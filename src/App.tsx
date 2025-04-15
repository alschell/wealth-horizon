
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import Dashboard from '@/components/dashboard/Dashboard';
import ValidationDemo from '@/components/form-validation-demo';

function App() {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/validation-demo" element={<ValidationDemo />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
