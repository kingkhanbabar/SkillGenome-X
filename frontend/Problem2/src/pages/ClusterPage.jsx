import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ResponsiveContainer, Treemap, Tooltip } from 'recharts';

const ClusterPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://skillgenome-x-production.up.railway.app/api/clusters');
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div style={{color: 'white', padding: '20px'}}>Loading Clusters...</div>;

  return (
    <div className="dashboard-content">
      
      {/* HEADER */}
      <div className="card control-room">
        <div className="control-header">
          <h2 style={{ color: "white" }}>🕸️ Skill Cluster Analysis</h2>
          <span className="mode-badge live" style={{background: '#d2a8ff', color: 'black'}}>
            RELATIONSHIP MAP
          </span>
        </div>
        <p style={{color: '#8b949e'}}>
          Visualizing how different skills are grouped in the current economy. 
          Larger blocks indicate <strong>higher market dominance</strong>.
        </p>
      </div>

      {/* TREEMAP CHART */}
      <div className="card chart-card" style={{marginTop: '20px', height: '600px', padding: '20px'}}>
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            data={data}
            dataKey="size"
            aspectRatio={4 / 3}
            stroke="#0d1117"
            content={<CustomizedContent />}
          >
            <Tooltip content={<CustomTooltip />} />
          </Treemap>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

// --- 1. Custom Tile Design (The Blocks) ---
const CustomizedContent = (props) => {
  // We extract 'depth' to know if it's a Parent Category or a Child Skill
  const { depth, x, y, width, height, name, value, fill } = props;

  // LEVEL 1: PARENT CATEGORIES (e.g., "Future Tech", "Agri-Tech")
  if (depth === 1) {
    return (
      <g>
        {/* Make the parent background transparent so we can see the children inside! */}
        <rect x={x} y={y} width={width} height={height} fill="rgba(0,0,0,0)" stroke="#1f2937" strokeWidth={3} />
        
        {/* Subtle background text for the category name */}
        {width > 100 && height > 50 && (
          <text x={x + 10} y={y + 25} fill="rgba(255,255,255,0.15)" fontSize={18} fontWeight="bold" style={{pointerEvents: 'none'}}>
            {name}
          </text>
        )}
      </g>
    );
  }

  // LEVEL 2: CHILD SKILLS (e.g., "AI/ML", "Drone Ops" - The colorful boxes!)
  if (depth === 2) {
    return (
      <g>
        <rect
          x={x} y={y} width={width} height={height}
          style={{
            fill: fill || '#58a6ff', // Uses the color from Python backend!
            stroke: '#0d1117',
            strokeWidth: 2,
            opacity: 0.9,
          }}
        />
        {/* Show text only if the box is big enough */}
        {width > 50 && height > 40 && (
          <>
            <text x={x + width / 2} y={y + height / 2 - 5} textAnchor="middle" fill="#fff" fontSize={14} fontWeight="bold" style={{pointerEvents: 'none', textShadow: '1px 1px 3px rgba(0,0,0,0.8)'}}>
              {name}
            </text>
            <text x={x + width / 2} y={y + height / 2 + 15} textAnchor="middle" fill="#f0f6fc" fontSize={12} fontWeight="bold" style={{pointerEvents: 'none', textShadow: '1px 1px 3px rgba(0,0,0,0.8)'}}>
              {value} Signals
            </text>
          </>
        )}
      </g>
    );
  }
  
  return null;
};

// --- 2. Custom Tooltip (Hover Effect) ---
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    // Don't show tooltip for empty background parents
    if (!data.fill) return null; 

    return (
      <div style={{
        background: '#161b22', border: '1px solid #30363d', padding: '10px', 
        borderRadius: '4px', boxShadow: '0 4px 10px rgba(0,0,0,0.5)'
      }}>
        <p style={{margin: 0, fontWeight: 'bold', color: '#f0f6fc'}}>{data.name}</p>
        <p style={{margin: 0, color: '#8b949e'}}>Dominance Score: {data.value}</p>
      </div>
    );
  }
  return null;//cluster updated
};

export default ClusterPage;