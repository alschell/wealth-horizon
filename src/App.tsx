
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import Dashboard from '@/components/dashboard/Dashboard';
import ValidationDemo from '@/components/form-validation-demo';
import FormExample from '@/components/examples/FormExample';
import HomePage from '@/components/HomePage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/validation-demo" element={<ValidationDemo />} />
        <Route path="/form-example" element={<FormExample />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
