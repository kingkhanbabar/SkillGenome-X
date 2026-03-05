import React from 'react';

export default function ChartsSection({ currentMode = 'LIVE' }) {
  // --- DYNAMIC DATA LOGIC ---
  // Default (LIVE) Data
  let emergingSkills = [
    { skill: 'SpamBot', width: '95%', color: '#10b981' },
    { skill: 'Tractor Repair', width: '90%', color: '#10b981' },
    { skill: 'Drone Ops', width: '85%', color: '#10b981' },
    { skill: 'Solar Install', width: '75%', color: '#10b981' },
    { skill: 'Hydroponics', width: '60%', color: '#059669' },
    { skill: 'Welding', width: '50%', color: '#047857' },
  ];

  let criticalGaps = [
    { skill: 'Cybersecurity', width: '75%', color: '#10b981' },
    { skill: 'Blockchain', width: '95%', color: '#10b981' },
    { skill: 'Rust', width: '45%', color: '#ef4444' },
    { skill: 'Cobol', width: '25%', color: '#7f1d1d' },
  ];

  // Change the bars if the Agri-Tech Boom is triggered
  if (currentMode.includes('AGRI')) {
    emergingSkills = [
      { skill: 'Hydroponics', width: '98%', color: '#10b981' },
      { skill: 'Drone Ops', width: '95%', color: '#10b981' },
      { skill: 'Agri-Data Science', width: '88%', color: '#10b981' },
      { skill: 'Solar Install', width: '80%', color: '#10b981' },
      { skill: 'Tractor Repair', width: '60%', color: '#059669' },
      { skill: 'SpamBot', width: '15%', color: '#047857' }, 
    ];
    criticalGaps = [
      { skill: 'IoT Sensors', width: '85%', color: '#ef4444' }, 
      { skill: 'Cybersecurity', width: '65%', color: '#10b981' },
      { skill: 'Blockchain', width: '40%', color: '#ef4444' },
      { skill: 'Rust', width: '85%', color: '#10b981' }, 
    ];
  } 
  // Change the bars if the Tech Crash is triggered
  else if (currentMode.includes('CRASH')) {
    emergingSkills = [
      { skill: 'SpamBot', width: '99%', color: '#dc2626' }, 
      { skill: 'Cybersecurity', width: '95%', color: '#10b981' },
      { skill: 'Server Maint.', width: '85%', color: '#10b981' },
      { skill: 'Data Recovery', width: '75%', color: '#10b981' },
      { skill: 'Cobol', width: '60%', color: '#059669' },
      { skill: 'Welding', width: '20%', color: '#047857' },
    ];
    criticalGaps = [
      { skill: 'Cybersecurity', width: '95%', color: '#ef4444' }, 
      { skill: 'System Admin', width: '90%', color: '#ef4444' },
      { skill: 'Blockchain', width: '15%', color: '#7f1d1d' },
      { skill: 'Rust', width: '10%', color: '#7f1d1d' },
    ];
  }

  // --- STYLES ---
  const cardStyle = {
    background: '#111827', border: '1px solid #1f2937', borderRadius: '12px',
    padding: '24px', marginBottom: '24px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
  };
  const rowStyle = { display: 'flex', alignItems: 'center', marginBottom: '16px', fontSize: '14px' };
  const labelStyle = { width: '130px', textAlign: 'right', paddingRight: '16px', color: '#9ca3af', fontWeight: 'bold' };
  const trackStyle = { flex: 1, background: '#1f2937', borderRadius: '10px', overflow: 'hidden', border: '1px solid #374151' };

  return (
    <div style={{ width: '100%', color: 'white', marginTop: '20px' }}>
      
      {/* 1. Top Emerging Skills */}
      <div style={cardStyle}>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#e5e7eb', marginBottom: '20px' }}>
          🔧 Top Emerging Skills (Simulated)
        </h3>
        <div>
          {emergingSkills.map((item, i) => (
            <div key={i} style={rowStyle}>
              <div style={labelStyle}>{item.skill}</div>
              <div style={{ ...trackStyle, height: '16px' }}>
                <div style={{ background: item.color, height: '100%', width: item.width, borderRadius: '10px', transition: 'width 1s ease-in-out, background-color 1s ease-in-out' }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Critical Skill Gaps */}
      <div style={cardStyle}>
        <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#f87171', marginBottom: '5px' }}>Critical Skill Gaps & AI Solutions</h3>
        <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '24px' }}>Bars indicate <span style={{ color: '#f87171', fontWeight: 'bold' }}>Critically Low Supply</span>.</p>
        
        <div>
          {criticalGaps.map((item, i) => (
            <div key={i} style={{ ...rowStyle, fontWeight: 'bold' }}>
              <div style={{ ...labelStyle, color: '#e5e7eb' }}>{item.skill}</div>
              <div style={{ ...trackStyle, height: '24px', borderRadius: '4px' }}>
                <div style={{ background: item.color, height: '100%', width: item.width, transition: 'width 1s ease-in-out, background-color 1s ease-in-out' }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. The Purple Bars */}
      <div style={{ display: 'flex', gap: '24px' }}>
        <div style={{ ...cardStyle, flex: 1 }}>
          {[ { label: 'Java', width: '35%' }, { label: 'JavaScript', width: '35%' }, { label: 'Go', width: '35%' }, { label: 'Assembly', width: '30%' }, { label: 'Python', width: '25%' } ].map((item, i) => (
            <div key={i} style={rowStyle}>
              <div style={labelStyle}>{item.label}</div>
              <div style={{ flex: 1, borderLeft: '1px solid #4b5563', paddingLeft: '4px', height: '16px', display: 'flex', alignItems: 'center' }}>
                 <div style={{ background: '#a78bfa', height: '12px', borderRadius: '2px', width: item.width, transition: 'width 1s ease-in-out' }}></div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ ...cardStyle, flex: 1 }}>
          {[ { label: 'France', width: '40%' }, { label: 'Australia', width: '40%' }, { label: 'Brazil', width: '40%' }, { label: 'Italy', width: '40%' }, { label: 'Netherlands', width: '35%' } ].map((item, i) => (
             <div key={i} style={rowStyle}>
              <div style={labelStyle}>{item.label}</div>
              <div style={{ flex: 1, borderLeft: '1px solid #4b5563', paddingLeft: '4px', height: '16px', display: 'flex', alignItems: 'center' }}>
                 <div style={{ background: '#a78bfa', height: '12px', borderRadius: '2px', width: item.width, transition: 'width 1s ease-in-out' }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}