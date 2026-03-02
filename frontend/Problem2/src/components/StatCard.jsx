import React from 'react';

const StatCard = ({ title, value, type }) => {
    // type can be 'normal', 'danger', or 'success'
    return (
        <div className={`card stat-card ${type}`}>
            <h3>{title}</h3>
            <p className="stat-number">{value}</p>
        </div>
    );
};

export default StatCard;