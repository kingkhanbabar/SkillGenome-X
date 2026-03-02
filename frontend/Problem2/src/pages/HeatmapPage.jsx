import React from 'react';
// Assuming you have your MapChart component from before
import MapChart from '../components/MapChart'; 

const HeatmapPage = () => {
  return (
    <div style={{ padding: '30px', background: '#0a0e17', minHeight: '100vh', color: '#e2e8f0' }}>
      
      <div style={{ marginBottom: '30px', padding: '20px', background: '#1e293b', borderRadius: '12px', border: '1px solid #334155' }}>
        <h1 style={{ margin: '0 0 10px 0', color: '#10b981' }}>🗺️ National Talent Heatmap</h1>
        <p style={{ margin: 0, color: '#9ca3af' }}>
          Real-time geospatial visualization of skill density across Indian states. 
          Data is dynamically updated based on the active Policy Simulation.
        </p>
      </div>

      <div style={{ background: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155', height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {typeof MapChart !== 'undefined' ? (
            <MapChart /> 
        ) : (
            <h2 style={{color: '#64748b'}}>Map Component Loading...</h2>
        )}
      </div>

    </div>
  );
};

export default HeatmapPage;