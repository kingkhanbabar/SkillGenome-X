import React from 'react';

const Header = () => {
    return (
        <header className="navbar">
            <div className="logo-section">
                <h1>🧬 SkillGenome X-Nations's Skill DNA</h1>
                <span className="version">v1.0.4-beta</span>
            </div>
            <div className="status-badge">
                <span className="dot"></span> LIVE MONITORING
            </div>
        </header>
    );
};

export default Header;