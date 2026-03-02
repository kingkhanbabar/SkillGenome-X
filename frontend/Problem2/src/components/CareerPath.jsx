import React, { useState } from 'react';
import axios from 'axios';

const CareerPath = () => {
    // State for the form
    const [region, setRegion] = useState('Rural Agri-Hub');
    const [manualSkill, setManualSkill] = useState('');
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleAnalyze = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Send data to Python Backend
            const response = await axios.post('http://localhost:8000/api/recommend', {
                region: region,
                current_skills: [manualSkill] // Sending as a list
            });
            setResults(response.data.recommendations);
        } catch (error) {
            console.error("Error getting recommendations", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard-content">
            <h2 style={{borderBottom: '1px solid #333', paddingBottom: '10px'}}>
                🚀 AI Career Pathfinder
            </h2>
            <p style={{color: '#8b949e', marginBottom: '20px'}}>
                Don't let your location limit you. Enter your current skills to find your hidden potential.
            </p>

            <div className="charts-container">
                
                {/* 1. THE INPUT FORM */}
                <div className="card" style={{height: 'auto'}}>
                    <h3>Tell us about yourself</h3>
                    <form onSubmit={handleAnalyze} style={{display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px'}}>
                        
                        <div>
                            <label style={{display: 'block', marginBottom: '5px', color: '#58a6ff'}}>Current Location</label>
                            <select 
                                value={region} 
                                onChange={(e) => setRegion(e.target.value)}
                                style={{width: '100%', padding: '10px', background: '#0d1117', color: 'white', border: '1px solid #30363d', borderRadius: '5px'}}
                            >
                                <option value="Rural Agri-Hub">Rural Agri-Hub</option>
                                <option value="Urban Metro">Urban Metro</option>
                                <option value="Industrial Belt">Industrial Belt</option>
                            </select>
                        </div>

                        <div>
                            <label style={{display: 'block', marginBottom: '5px', color: '#58a6ff'}}>Your Top Skill</label>
                            <input 
                                type="text" 
                                placeholder="e.g. Farming, Welding, Python"
                                value={manualSkill}
                                onChange={(e) => setManualSkill(e.target.value)}
                                style={{width: '100%', padding: '10px', background: '#0d1117', color: 'white', border: '1px solid #30363d', borderRadius: '5px'}}
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="sim-btn primary"
                            style={{marginTop: '10px'}}
                        >
                            {loading ? "Analyzing Genome..." : "Analyze My Potential"}
                        </button>
                    </form>
                </div>

                {/* 2. THE RESULTS DISPLAY */}
                <div className="card" style={{height: 'auto', minHeight: '300px'}}>
                    <h3>AI Recommendations</h3>
                    
                    {!results && !loading && (
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#8b949e'}}>
                            Enter your details to see matches.
                        </div>
                    )}

                    {results && results.map((rec, index) => (
                        <div key={index} style={{
                            background: 'rgba(51, 255, 0, 0.05)', 
                            border: '1px solid #238636', 
                            padding: '15px', 
                            borderRadius: '8px',
                            marginTop: '15px'
                        }}>
                            <h4 style={{margin: '0 0 5px 0', color: '#3fb950'}}>Target Role: {rec.role}</h4>
                            <div style={{fontSize: '0.9rem', marginBottom: '10px'}}>
                                <span style={{color: '#8b949e'}}>Skill to Learn: </span>
                                <strong style={{color: 'white'}}>{rec.skill_needed}</strong>
                            </div>
                            <div style={{width: '100%', background: '#30363d', height: '6px', borderRadius: '3px', marginBottom: '10px'}}>
                                <div style={{width: `${rec.match_score}%`, background: '#3fb950', height: '100%', borderRadius: '3px'}}></div>
                            </div>
                            <p style={{fontSize: '0.85rem', margin: 0, color: '#c9d1d9'}}>
                                💡 {rec.reason}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CareerPath;