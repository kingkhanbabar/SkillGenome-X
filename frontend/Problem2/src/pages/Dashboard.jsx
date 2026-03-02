import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  // Store the data coming from the backend
  const [metrics, setMetrics] = useState({
    match_rate: 68.2, 
    market_gap: 31.8, 
    economic_unlock: 12.5, 
    risk_score: 0.0, 
    target_state: "All India",
    policy_active: "None"
  });

  // Store user selections in the simulator
  const [selectedState, setSelectedState] = useState('Maharashtra');
  const [selectedPolicy, setSelectedPolicy] = useState('Launch State Skilling Program');
  const [isSimulating, setIsSimulating] = useState(false);

  // 1. Load initial data on startup
  const fetchMetrics = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/dashboard/metrics');
      if (res.data) setMetrics(res.data);
    } catch (err) { console.error("Backend offline:", err); }
  };

  useEffect(() => { 
    fetchMetrics(); 
  }, []);

  // 2. Run the AI Forecast Simulation
  const handleRunSimulation = async () => {
    setIsSimulating(true);
    try {
      const res = await axios.post('http://localhost:8000/api/sim/run_forecast', {
        state: selectedState,
        policy: selectedPolicy
      });
      
      // Artificial delay to make it feel like "AI is calculating"
      setTimeout(() => {
        setMetrics(res.data);
        setIsSimulating(false);
      }, 1500); 

    } catch (err) {
      console.error(err);
      setIsSimulating(false);
    }
  };

  return (
    <div style={{ padding: '20px', background: '#0B1120', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'sans-serif' }}>
      
      {/* =========================================
          TOP ROW: MICRO-METRICS & ECONOMIC UNLOCK 
          ========================================= */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '20px' }}>
        
        {/* Left: 4 Stat Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', background: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
          <MicroStat title="SKILL MATCH RATE" value={`${metrics.match_rate}%`} icon="🎯" color="#10b981" />
          <MicroStat title="MARKET GAP" value={`${metrics.market_gap}%`} icon="⚠️" color="#f59e0b" />
          <MicroStat title="ACTIVE CLUSTERS" value="3" icon="📍" color="#3b82f6" />
          <MicroStat title="SYSTEM HEALTH" value="9.2/10" icon="⚡" color="#8b5cf6" />
        </div>

        {/* Right: Big Economic Unlock Box */}
        <div style={{ background: 'linear-gradient(145deg, #064e3b, #022c22)', padding: '25px', borderRadius: '12px', border: '1px solid #059669', boxShadow: '0 10px 25px rgba(5, 150, 105, 0.2)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h3 style={{ margin: '0 0 5px 0', fontSize: '0.9rem', color: '#6ee7b7', letterSpacing: '1px' }}>✨ ECONOMIC UNLOCK</h3>
          <h1 style={{ margin: 0, fontSize: '3.2rem', color: '#10b981', fontWeight: 'bold' }}>
            ₹ {metrics.economic_unlock} Cr
          </h1>
          <p style={{ margin: '5px 0 0 0', fontSize: '0.8rem', color: '#a7f3d0' }}>Projected Annual GDP Contribution from hidden talent.</p>
          <div style={{ marginTop: '15px', fontSize: '0.75rem', background: '#065f46', padding: '5px 10px', borderRadius: '4px', alignSelf: 'flex-start', border: '1px solid #10b981' }}>
            92% Realization Probability
          </div>
        </div>
      </div>

      {/* =========================================
          MIDDLE ROW: MAIN SIMULATOR AREA 
          ========================================= */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1fr', gap: '20px' }}>
        
        {/* COL 1: Interventions Status */}
        <div style={{ background: '#1e293b', padding: '25px', borderRadius: '12px', border: '1px solid #334155' }}>
          <h3 style={{ color: '#818cf8', margin: '0 0 20px 0', fontSize: '1.1rem', textTransform: 'uppercase' }}>
            {metrics.target_state} POLICY INTERVENTIONS
          </h3>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', background: '#0f172a', padding: '15px', borderRadius: '8px' }}>
             <div>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#9ca3af', letterSpacing: '1px' }}>ECONOMIC IMPACT</p>
                <h2 style={{ margin: '5px 0 0 0', color: '#10b981', fontSize: '1.5rem' }}>High</h2>
             </div>
             <div>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#9ca3af', letterSpacing: '1px' }}>IMPLEMENTATION RISK</p>
                <h2 style={{ margin: '5px 0 0 0', color: '#f59e0b', fontSize: '1.5rem' }}>Medium</h2>
             </div>
          </div>

          <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid #3b82f6', padding: '15px', borderRadius: '8px' }}>
            <h4 style={{ margin: '0 0 5px 0', color: '#60a5fa', fontSize: '0.85rem', textTransform: 'uppercase' }}>Current Active Policy:</h4>
            <p style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold', color: 'white' }}>{metrics.policy_active}</p>
          </div>
        </div>

        {/* COL 2: Impact Simulator (The Core Console) */}
        <div style={{ background: '#1e293b', padding: '25px', borderRadius: '12px', border: '1px solid #334155', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ color: '#fcd34d', margin: '0 0 20px 0', fontSize: '1.1rem', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px' }}>
            ⚡ IMPACT SIMULATOR (AI FORECAST)
          </h3>
          
          <label style={{ fontSize: '0.8rem', color: '#9ca3af', marginBottom: '5px', fontWeight: 'bold' }}>TARGET JURISDICTION</label>
          <select 
            value={selectedState} 
            onChange={(e) => setSelectedState(e.target.value)}
            style={{ padding: '14px', background: '#0f172a', color: 'white', border: '1px solid #475569', borderRadius: '6px', marginBottom: '20px', fontSize: '1rem' }}
          >
            <option>Maharashtra</option>
            <option>Karnataka</option>
            <option>Gujarat</option>
            <option>Telangana</option>
            <option>Uttar Pradesh</option>
          </select>

          <label style={{ fontSize: '0.8rem', color: '#9ca3af', marginBottom: '5px', fontWeight: 'bold' }}>POLICY INTERVENTION</label>
          <select 
            value={selectedPolicy} 
            onChange={(e) => setSelectedPolicy(e.target.value)}
            style={{ padding: '14px', background: '#0f172a', color: 'white', border: '1px solid #475569', borderRadius: '6px', marginBottom: '30px', fontSize: '1rem' }}
          >
            <option>Launch State Skilling Program (Tech + Agri)</option>
            <option>Provide Hardware Subsidies for MSMEs</option>
            <option>Tax Breaks for Remote Hiring</option>
          </select>

          <button 
            onClick={handleRunSimulation}
            disabled={isSimulating}
            style={{
              padding: '16px', 
              background: isSimulating ? '#4338ca' : '#6366f1', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px', 
              fontSize: '1.1rem', 
              fontWeight: 'bold', 
              cursor: isSimulating ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)', 
              transition: 'all 0.3s',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            {isSimulating ? (
              <>⏳ PROCESSING FORECAST...</>
            ) : (
              <>▶ RUN SIMULATION</>
            )}
          </button>

          {/* Risk Reduction output */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #334155' }}>
             <span style={{ color: '#9ca3af', fontSize: '0.9rem', fontWeight: 'bold' }}>Projected Risk Reduction:</span>
             <strong style={{ color: '#10b981', fontSize: '1.8rem' }}>{metrics.risk_score} pts</strong>
          </div>
        </div>

        {/* COL 3: System Users & Active Intelligence */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* System Users Box */}
          <div style={{ background: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
            <h3 style={{ color: '#94a3b8', margin: '0 0 15px 0', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>👥 SYSTEM USERS</h3>
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0, fontSize: '0.95rem', color: '#cbd5e1', lineHeight: '2' }}>
              <li><span style={{color: '#3b82f6', marginRight: '8px'}}>🔹</span>State Skill Dev Missions</li>
              <li><span style={{color: '#3b82f6', marginRight: '8px'}}>🔹</span>District Employment Offices</li>
              <li><span style={{color: '#3b82f6', marginRight: '8px'}}>🔹</span>National Policy Planners</li>
              <li><span style={{color: '#3b82f6', marginRight: '8px'}}>🔹</span>Rural NGO Programs</li>
            </ul>
          </div>

          {/* Active Intelligence Box */}
          <div style={{ background: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155', flex: 1 }}>
            <h3 style={{ color: '#94a3b8', margin: '0 0 15px 0', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>🧠 ACTIVE INTELLIGENCE</h3>
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0, fontSize: '0.85rem', color: '#a7f3d0', lineHeight: '2' }}>
              <li><span style={{marginRight: '8px'}}>✅</span>Sentence-BERT (Semantic Matching)</li>
              <li><span style={{marginRight: '8px'}}>✅</span>Isolation Forest (Anomaly Detection)</li>
              <li><span style={{marginRight: '8px'}}>✅</span>Policy Impact Simulator Engine</li>
              <li><span style={{marginRight: '8px'}}>✅</span>Hidden Talent Detector</li>
              <li><span style={{marginRight: '8px'}}>✅</span>Allocation Risk Predictor</li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
};

// --- Small helper component for the top 4 stats ---
const MicroStat = ({ title, value, icon, color }) => (
  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <p style={{ margin: '0 0 5px 0', fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold', letterSpacing: '0.5px' }}>{title}</p>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span style={{ fontSize: '1.5rem' }}>{icon}</span>
      <h2 style={{ margin: 0, fontSize: '1.8rem', color: color, fontWeight: 'bold' }}>{value}</h2>
    </div>
  </div>
);

export default Dashboard;