import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; // Make sure any global resets are here

// --- IMPORT COMPONENTS ---
import Sidebar from './components/Sidebar';

// --- IMPORT PAGES ---
import Dashboard from './pages/Dashboard';
import HeatmapPage from './pages/HeatmapPage'; // <-- The new page
import ClusterPage from './pages/ClusterPage';
import CareerPath from './pages/CareerPath';
import ControlRoom from './pages/ControlRoom';

function App() {
  return (
    <Router>
      {/* FULL SCREEN FLEX CONTAINER: 
        Keeps Sidebar fixed on left, content scrolls on the right 
      */}
      <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', backgroundColor: '#0a0e17' }}>
        
        {/* LEFT SIDEBAR */}
        <Sidebar />
        
        {/* MAIN CONTENT AREA (Scrollable) */}
        <div style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/heatmap" element={<HeatmapPage />} />
            <Route path="/clusters" element={<ClusterPage />} />
            <Route path="/career" element={<CareerPath />} />
            <Route path="/control" element={<ControlRoom />} />
          </Routes>
        </div>

      </div>
    </Router>
  );
}

export default App;