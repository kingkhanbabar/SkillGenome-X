import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const fetchDashboardData = async () => {
    try {
        const response = await axios.get(`${API_URL}/dashboard`);
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};

export const runSimulation = async (scenario) => {
    try {
        const response = await axios.get(`${API_URL}/simulate/${scenario}`);
        return response.data;
    } catch (error) {
        console.error("Simulation Failed:", error);
        throw error;
    }
};