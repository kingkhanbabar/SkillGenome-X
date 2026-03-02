import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ControlRoom = () => {
  const [status, setStatus] = useState('Checking...');
  const [currentMode, setCurrentMode] = useState('UNKNOWN');

  // 1. Check Backend Status
  const checkStatus = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/sim/status');
      setCurrentMode(res.data.current_scenario);
      setStatus(res.data.market_trend);
    } catch (err) { setStatus('Backend Offline'); }
  };

  // 2. Send Command to Backend
  const setMode = async (mode) => {
    await axios.post(`http://localhost:8000/api/sim/set/${mode}`);
    checkStatus(); // Update UI immediately
  };

  // Check status on load
  useEffect(() => { checkStatus(); }, []);

  return (
    <div style={{
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: '#0d1117', 
      color: 'white'
    }}>
      <div style={{
        border: '2px solid #30363d', 
        padding: '40px', 
        borderRadius: '12px', 
        textAlign: 'center', 
        maxWidth: '500px', 
        width: '100%',
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
      }}>
        
        <h1 style={{color: '#58a6ff', marginBottom: '10px'}}>🎛️ Admin Control</h1>
        
        <div style={{marginBottom: '30px', padding: '15px', background: '#161b22', borderRadius: '8px', border: '1px solid #30363d'}}>
            <div style={{color: '#8b949e', fontSize: '0.9rem', marginBottom: '5px'}}>CURRENT GLOBAL STATE</div>
            <div style={{fontSize: '1.8rem', fontWeight: 'bold', color: 'white'}}>
                {currentMode.toUpperCase()}
            </div>
            <div style={{color: '#238636', fontSize: '1rem', marginTop: '5px'}}>{status}</div>
        </div>

        <div style={{display: 'grid', gap: '15px'}}>
          <button 
            onClick={() => setMode('invest_agri')}
            className="sim-btn primary"
            style={{padding: '15px', fontSize: '1.1rem', fontWeight: 'bold'}}
          >
            🚀 Trigger Agri-Tech Boom
          </button>

          <button 
            onClick={() => setMode('tech_crash')}
            className="sim-btn danger"
            style={{padding: '15px', fontSize: '1.1rem', fontWeight: 'bold'}}
          >
            📉 Trigger Tech Crash
          </button>

          <button 
            onClick={() => setMode('live')}
            className="sim-btn outline"
            style={{padding: '15px', fontSize: '1.1rem', fontWeight: 'bold'}}
          >
            🔄 Reset to Live Data
          </button>
        </div>

      </div>
    </div>
  );
};

export default ControlRoom;