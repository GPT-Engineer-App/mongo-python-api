import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API_KEY = import.meta.env.VITE_API_KEY || '2956b7480392191b9ab24b159548719c305a8ad5ccf16ceb8f1d933d489228b0';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`
  }
});

export const fetchCampaigns = async () => {
  try {
    console.log('Fetching campaigns...');
    const response = await api.get('/campaigns');
    console.log('Campaigns fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    console.log('Error details:', error.response ? error.response.data : 'No response data');
    throw error;
  }
};

export const fetchCampaignDetails = async (id) => {
  try {
    const response = await api.get(`/campaigns/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching campaign details for id ${id}:`, error);
    throw error;
  }
};
