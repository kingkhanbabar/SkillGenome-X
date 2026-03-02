import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const CareerPath = () => {
  const [inputText, setInputText] = useState('');
  const [region, setRegion] = useState('Rural Agri-Hub');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!inputText) return;
    setLoading(true);
    setResults(null); 
    
    try {
      const res = await axios.post('http://localhost:8000/api/recommend', {
        region: region,
        current_skills: inputText.split(" ") 
      });
      setResults(res.data.recommendations);
    } catch (err) {
      console.error(err);
      alert("Backend error. Make sure main.py is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-content">
      
      {/* HEADER */}
      <div className="card control-room">
        <div className="control-header">
          <h2>🚀 AI Career Pathfinder</h2>
          <span className="mode-badge live" style={{background: '#2ea043', color: 'white'}}>
            HR STRATEGY ENABLED
          </span>
        </div>
        <p style={{color: '#8b949e'}}>
          The AI will analyze your skills and detect <strong>Critical Gaps</strong> in your region.
        </p>
      </div>

      {/* INPUT SECTION */}
      <div className="card chart-card" style={{marginTop: '20px', padding: '30px'}}>
        <div style={{display: 'flex', gap: '15px'}}>
          <input 
            type="text" 
            placeholder="e.g. farmer, electronics, coding..." 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={{flex: 1, padding: '12px', borderRadius: '6px', background: '#0d1117', border: '1px solid #30363d', color: 'white'}}
          />
          
          <select 
            value={region} 
            onChange={(e) => setRegion(e.target.value)}
            style={{padding: '12px', borderRadius: '6px', background: '#0d1117', border: '1px solid #30363d', color: 'white'}}
          >
            <option>Rural Agri-Hub</option>
            <option>Urban Metro</option>
            <option>Industrial Belt</option>
            <option>Remote Hills</option>
          </select>

          <button className="sim-btn primary" onClick={handleSearch} disabled={loading}>
            {loading ? 'Thinking...' : 'Analyze Potential'}
          </button>
        </div>
      </div>

      {/* RESULTS GRID */}
      <div className="stats-grid" style={{marginTop: '30px', gridTemplateColumns: '1fr'}}>
        {results && results.map((job, index) => (
          <motion.div 
            key={index}
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            className="card"
            style={{
                border: '1px solid #30363d', 
                borderLeft: '5px solid #2ea043', 
                background: '#0d1117'
            }}
          >
            {/* ROLE HEADER */}
            <h3 style={{color: '#2ea043', margin: '0 0 10px 0'}}>
              Target Role: {job.role}
            </h3>
            
            <p style={{color: '#8b949e', marginBottom: '15px'}}>
               Skill to Learn: <strong style={{color: 'white'}}>{job.skill_needed}</strong>
            </p>

            {/* PROGRESS BAR */}
            <div style={{width: '100%', background: '#21262d', height: '8px', borderRadius: '4px', marginBottom: '15px'}}>
                <div style={{width: `${job.match_score}%`, background: '#2ea043', height: '100%', borderRadius: '4px'}}></div>
            </div>

            {/* === THIS IS THE FIX === */}
            {/* Using 'pre-wrap' ensures \n creates a new line */}
            <div 
              style={{
                background: 'rgba(46, 160, 67, 0.1)', 
                padding: '15px', 
                borderRadius: '6px',
                color: '#c9d1d9',
                fontSize: '0.95rem',
                lineHeight: '1.6',
                whiteSpace: 'pre-wrap', // <--- THIS HANDLES THE SPACING
                fontFamily: 'monospace'
              }}
            >
               💡 {job.reason}
            </div>
            {/* ======================= */}

          </motion.div>
        ))}
      </div>

    </div>
  );
};

export default CareerPath;