import axios from 'axios';

const API_URL = import.meta.env.VITE_GOPHISH_API_URL || 'http://localhost:5000';
const API_KEY = import.meta.env.VITE_GOPHISH_API_KEY || 'your-api-key';

const gophishApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export const fetchCampaigns = async () => {
  try {
    const response = await gophishApi.get('/campaigns');
    return response.data;
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    throw error;
  }
};
