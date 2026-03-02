import React from 'react';

const LogPanel = ({ links }) => {
    return (
        <div className="card log-panel">
            <h2>🔗 Skill Synergy Graph (Live Feed)</h2>
            <div className="log-window">
                {links && links.map((link, index) => (
                    <div key={index} className="log-entry">
                        <span className="timestamp">{new Date().toLocaleTimeString()}</span>
                        <span className="arrow">➤</span> 
                        Detected Synergy: <span className="highlight">{link.source}</span> 
                        <span className="connector">↔</span> 
                        <span className="highlight">{link.target}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LogPanel;