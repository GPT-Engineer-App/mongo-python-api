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
    const response = await api.get('/campaigns');
    return response.data;
  } catch (error) {
    console.error('Error fetching campaigns:', error);
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

export const createCampaign = async (campaignData) => {
  try {
    const response = await api.post('/campaigns', campaignData);
    return response.data;
  } catch (error) {
    console.error('Error creating campaign:', error);
    throw error;
  }
};

export const updateCampaign = async (id, campaignData) => {
  try {
    const response = await api.put(`/campaigns/${id}`, campaignData);
    return response.data;
  } catch (error) {
    console.error(`Error updating campaign with id ${id}:`, error);
    throw error;
  }
};

export const deleteCampaign = async (id) => {
  try {
    const response = await api.delete(`/campaigns/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting campaign with id ${id}:`, error);
    throw error;
  }
};
