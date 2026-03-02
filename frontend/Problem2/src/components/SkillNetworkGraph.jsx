import React, { useMemo } from 'react';

const SkillNetworkGraph = ({ links }) => {
    const graphData = useMemo(() => {
        if (!links || links.length === 0) return { nodes: [], lines: [] };
        const uniqueSkills = new Set();
        links.forEach(l => { uniqueSkills.add(l.source); uniqueSkills.add(l.target); });
        const nodesList = Array.from(uniqueSkills);
        const radius = 120; const centerX = 200; const centerY = 150;
        
        const nodes = nodesList.map((skill, index) => {
            const angle = (index / nodesList.length) * 2 * Math.PI;
            return {
                id: skill,
                x: centerX + radius * Math.cos(angle),
                y: centerY + radius * Math.sin(angle),
                color: index % 2 === 0 ? "#58a6ff" : "#3fb950"
            };
        });

        const lines = links.map(link => {
            const s = nodes.find(n => n.id === link.source);
            const t = nodes.find(n => n.id === link.target);
            return { x1: s.x, y1: s.y, x2: t.x, y2: t.y };
        });
        return { nodes, lines };
    }, [links]);

    return (
        <div className="card" style={{ alignItems: 'center' }}>
            <h2 style={{ width: '100%', borderBottom: '1px solid #333', paddingBottom: '10px' }}>🔗 Skill Synergy Map</h2>
            <svg width="400" height="320" viewBox="0 0 400 320">
                {graphData.lines.map((l, i) => (
                    <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#30363d" strokeWidth="2" />
                ))}
                {graphData.nodes.map((n, i) => (
                    <g key={i}>
                        <circle cx={n.x} cy={n.y} r="8" fill={n.color} opacity="0.6">
                            <animate attributeName="r" values="8;12;8" dur="3s" repeatCount="indefinite" />
                        </circle>
                        <circle cx={n.x} cy={n.y} r="5" fill="#ffffff" />
                        <text x={n.x} y={n.y - 15} fill="#c9d1d9" fontSize="10" textAnchor="middle" fontWeight="bold">{n.id}</text>
                    </g>
                ))}
            </svg>
        </div>
    );
};

export default SkillNetworkGraph;