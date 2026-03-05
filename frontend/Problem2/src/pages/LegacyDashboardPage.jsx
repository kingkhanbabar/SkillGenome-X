import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChartsSection from '../components/ChartsSection';

export default function LegacyDashboardPage() {
  // --- REAL BACKEND STATE ---
  const [currentMode, setCurrentMode] = useState('LOADING...');
  
  // --- VISUAL METRICS (Simulated changes based on backend mode) ---
  const [signals, setSignals] = useState(1800);
  const [botsBlocked, setBotsBlocked] = useState(10);
  const [verifiedTalent, setVerifiedTalent] = useState(1790);

  // 1. Check the real backend status
  const checkStatus = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/sim/status');
      const mode = res.data.current_scenario.toUpperCase();
      setCurrentMode(mode);
      
      // Update numbers based on the backend mode
      if (mode.includes('AGRI')) {
        setSignals(2150); setVerifiedTalent(2110); setBotsBlocked(12);
      } else if (mode.includes('CRASH')) {
        setSignals(1800); setVerifiedTalent(1390); setBotsBlocked(95);
      } else {
        setSignals(1800); setVerifiedTalent(1790); setBotsBlocked(10);
      }
    } catch (err) { 
      setCurrentMode('BACKEND OFFLINE'); 
    }
  };

  // 2. Send Command to Backend (Exactly like your Control Room)
  const setMode = async (mode) => {
    try {
      await axios.post(`http://localhost:8000/api/sim/set/${mode}`);
      checkStatus(); // Refresh the UI instantly after clicking
    } catch (err) {
      console.error("Failed to set mode:", err);
    }
  };

  // Check backend status when the page loads
  useEffect(() => { 
    checkStatus(); 
    
    // Auto-refresh every 3 seconds to catch Admin Simulator changes
    const interval = setInterval(checkStatus, 3000);
    return () => clearInterval(interval);
  }, []);

  // --- STYLES ---
  const cardStyle = {
    background: '#111827', border: '1px solid #1f2937', borderRadius: '12px',
    padding: '24px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
  };

  const buttonStyle = {
    padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', color: 'white',
    border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'
  };

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto', color: 'white', fontFamily: 'sans-serif' }}>
      
      {/* Top Section: Policy Engine */}
      <div style={{ ...cardStyle, marginBottom: '24px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          🎛️ Policy Simulation Engine
        </h2>
        
        {/* THIS NOW SHOWS THE REAL BACKEND MODE */}
        <div style={{ fontSize: '13px', fontFamily: 'monospace', color: currentMode === 'LIVE' ? '#10b981' : '#f59e0b', marginBottom: '20px', fontWeight: 'bold' }}>
          MODE: {currentMode}
        </div>
        
        <div style={{ display: 'flex', gap: '16px' }}>
          {/* THESE BUTTONS NOW TRIGGER YOUR PYTHON API */}
          <button onClick={() => setMode('invest_agri')} style={{ ...buttonStyle, background: '#16a34a' }}>
            🚀 Invest $1B (Agri)
          </button>
          <button onClick={() => setMode('tech_crash')} style={{ ...buttonStyle, background: '#dc2626' }}>
            📉 Tech Crash
          </button>
          <button onClick={() => setMode('live')} style={{ ...buttonStyle, background: '#2563eb' }}>
            🔄 Reset
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
        <div style={{ ...cardStyle, flex: 1 }}>
          <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase', marginBottom: '8px' }}>Total Signals</div>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#60a5fa' }}>{signals.toLocaleString()}</div>
        </div>
        <div style={{ ...cardStyle, flex: 1 }}>
          <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase', marginBottom: '8px' }}>Bots Blocked</div>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#ef4444' }}>{botsBlocked.toLocaleString()}</div>
        </div>
        <div style={{ ...cardStyle, flex: 1 }}>
          <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase', marginBottom: '8px' }}>Verified Talent</div>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#34d399' }}>{verifiedTalent.toLocaleString()}</div>
        </div>
      </div>

      {/* 👇 THIS IS THE CRUCIAL CHANGE RIGHT HERE 👇 */}
      <ChartsSection currentMode={currentMode} />

    </div>
  );
}