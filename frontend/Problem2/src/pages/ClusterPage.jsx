import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ResponsiveContainer, Treemap, Tooltip } from 'recharts';

const ClusterPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/clusters');
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
  const { root, depth, x, y, width, height, index, name, value } = props;

  return (
    <g>
      {/* The Colored Rectangle */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: props.fill || '#58a6ff', // Default blue if no color sent
          stroke: '#0d1117',
          strokeWidth: 2,
          opacity: 0.8,
        }}
      />
      
      {/* The Text Label (Only show if box is big enough) */}
      {width > 50 && height > 30 && (
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          fill="#fff"
          fontSize={14}
          fontWeight="bold"
          style={{pointerEvents: 'none'}} // Let clicks pass through to tooltip
        >
          {name}
        </text>
      )}
      
      {/* The Value (Smaller text below name) */}
      {width > 50 && height > 50 && (
        <text
          x={x + width / 2}
          y={y + height / 2 + 18}
          textAnchor="middle"
          fill="rgba(255,255,255,0.7)"
          fontSize={11}
        >
          {value} Signals
        </text>
      )}
    </g>
  );
};

// --- 2. Custom Tooltip (Hover Effect) ---
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div style={{
        background: '#161b22', 
        border: '1px solid #30363d', 
        padding: '10px', 
        borderRadius: '4px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.5)'
      }}>
        <p style={{margin: 0, fontWeight: 'bold', color: '#f0f6fc'}}>{data.name}</p>
        <p style={{margin: 0, color: '#8b949e'}}>Dominance Score: {data.value}</p>
      </div>
    );
  }
  return null;
};

export default ClusterPage;