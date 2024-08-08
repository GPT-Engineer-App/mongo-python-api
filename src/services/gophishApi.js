import axios from 'axios';

const API_URL = 'http://your-gophish-api-url'; // Replace with your actual GoPhish API URL
const API_KEY = 'your-api-key'; // Replace with your actual API key

const gophishApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Authorization': API_KEY,
    'Content-Type': 'application/json',
  },
});

export const fetchCampaigns = async () => {
  try {
    const response = await gophishApi.get('/api/campaigns/');
    return response.data;
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    throw error;
  }
};
