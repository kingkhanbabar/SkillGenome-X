import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  // Helper function to highlight the active menu item
  const isActive = (path) => location.pathname === path;

  const linkStyle = (path) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '15px 20px',
    color: isActive(path) ? '#ffffff' : '#9ca3af',
    background: isActive(path) ? '#1e293b' : 'transparent',
    textDecoration: 'none',
    borderLeft: isActive(path) ? '4px solid #10b981' : '4px solid transparent',
    marginBottom: '5px',
    fontWeight: isActive(path) ? 'bold' : 'normal',
    transition: 'all 0.2s',
    fontSize: '0.95rem'
  });

  return (
    <div style={{ 
      width: '260px', 
      background: '#0B1120', 
      borderRight: '1px solid #1f2937', 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      flexShrink: 0 // Prevents sidebar from squishing
    }}>
       {/* LOGO SECTION */}
       <div style={{ padding: '25px 20px', fontSize: '1.4rem', fontWeight: 'bold', color: '#fff', borderBottom: '1px solid #1f2937' }}>
          🧬 SkillGenome <span style={{color: '#10b981'}}>X</span>
          <div style={{fontSize: '0.7rem', color: '#9ca3af', marginTop: '5px', fontWeight: 'normal'}}>v4.0 Command Center</div>
       </div>

       {/* NAVIGATION LINKS */}
       <nav style={{ flex: 1, marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
          <Link to="/" style={linkStyle('/')}>
             <span>📊</span> Command Center
          </Link>
          <Link to="/heatmap" style={linkStyle('/heatmap')}>
             <span>🗺️</span> Talent Heatmap
          </Link>
          <Link to="/clusters" style={linkStyle('/clusters')}>
             <span>🕸️</span> Cluster Analysis
          </Link>
          <Link to="/career" style={linkStyle('/career')}>
             <span>🚀</span> AI Pathfinder
          </Link>
       </nav>

       {/* ADMIN SECTION AT BOTTOM */}
       <div style={{ padding: '20px', borderTop: '1px solid #1f2937' }}>
          <Link to="/control" style={{
            ...linkStyle('/control'), 
            color: '#f85149', 
            borderLeft: isActive('/control') ? '4px solid #f85149' : '4px solid transparent'
          }}>
             <span>🎛️</span> Admin Simulator
          </Link>
       </div>
    </div>
  );
};

export default Sidebar;