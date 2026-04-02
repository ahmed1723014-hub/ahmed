import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CognitiveTests from './pages/CognitiveTests';
import DigitalTwin from './pages/DigitalTwin';
import Simulation from './pages/Simulation';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-space-dark">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/tests" element={<Layout><CognitiveTests /></Layout>} />
        <Route path="/twin" element={<Layout><DigitalTwin /></Layout>} />
        <Route path="/simulation" element={<Layout><Simulation /></Layout>} />
        <Route path="/analytics" element={<Layout><Analytics /></Layout>} />
        <Route path="/settings" element={<Layout><Settings /></Layout>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
