import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

const MapChart = () => {
    const [mapData, setMapData] = useState(null);

    useEffect(() => {
        // Fetch the Plotly JSON from your Python Backend (UPDATED WITH RAILWAY URL)
        axios.get('https://skillgenome-x-production.up.railway.app/api/heatmap')
            .then(res => setMapData(res.data))
            .catch(err => console.error("Map Load Error:", err));
    }, []);

    if (!mapData) return <div>Loading Map...</div>;

    return (
        <div className="card" style={{ height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Plot
                data={mapData.data}
                layout={{
                    ...mapData.layout,
                    width: 500,  // Adjust size to fit your card
                    height: 350,
                    paper_bgcolor: 'rgba(0,0,0,0)', // Transparent background
                    plot_bgcolor: 'rgba(0,0,0,0)',
                    font: { color: '#ffffff' }, // Dark mode text
                    geo: {
                        bgcolor: 'rgba(0,0,0,0)',
                        showframe: false,
                        showcoastlines: false,
                        fitbounds: "locations"
                    }
                }}
                config={{ displayModeBar: false }} // Hides the toolbar
            />
        </div>
    );
};

export default MapChart;