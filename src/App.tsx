import React, { useState } from 'react';
import { CreateShipment } from './pages/CreateShipment';
import { LogistDashboard } from './pages/LogistDashboard'; 
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function AppContent() {
  const [shipments, setShipments] = useState<any[]>(() => {
    const saved = localStorage.getItem('buster_shipments');
    return saved ? JSON.parse(saved) : [];
  });

  React.useEffect(() => {
    localStorage.setItem('buster_shipments', JSON.stringify(shipments));
  }, [shipments]);

  const navigate = useNavigate();

  const addShipment = (data: any) => {
    const newShipment = { ...data, id: Date.now(), status: 'pending' };
    setShipments(prev => [...prev, newShipment]);
    navigate('/logist-dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-[#003366] p-4 text-white flex justify-center gap-10 font-bold shadow-md">
        <Link to="/create-shipment" className="hover:text-[#FFD700] uppercase text-xs">Бізнес</Link>
        <Link to="/logist-dashboard" className="hover:text-[#FFD700] uppercase text-xs">Логіст УЗ</Link>
      </nav>

      <div className="py-10">
        <Routes>
          <Route path="/create-shipment" element={<CreateShipment onAdd={addShipment} />} />
          <Route path="/logist-dashboard" element={<LogistDashboard />} />
          <Route path="/" element={<CreateShipment onAdd={addShipment} />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <AppContent />
    </QueryClientProvider>
  );
}