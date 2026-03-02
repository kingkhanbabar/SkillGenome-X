import React from 'react';
import { 
    BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer 
} from 'recharts';

const ChartsSection = ({ regionalData, skillData }) => {
    return (
        <div className="charts-container">
            {/* Chart 1: Regional Map */}
            <div className="card chart-card">
                <h2>📍 Regional Talent Clusters</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={regionalData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis dataKey="name" stroke="#b0b0b0" />
                        <YAxis stroke="#b0b0b0" />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1e1e1e', border: '1px solid #333' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Bar dataKey="value" fill="#8884d8" barSize={40} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Chart 2: Emerging Skills */}
            <div className="card chart-card">
                <h2>🔧 Top Emerging Skills</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={skillData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis type="number" stroke="#b0b0b0" />
                        <YAxis type="category" dataKey="name" width={100} stroke="#b0b0b0" />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1e1e1e', border: '1px solid #333' }} 
                            itemStyle={{ color: '#fff' }}
                        />
                        <Bar dataKey="value" fill="#82ca9d" barSize={20} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ChartsSection;