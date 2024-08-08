import axios from 'axios';

const API_URL = '/api';

export const fetchCampaigns = async () => {
  try {
    const response = await axios.get(`${API_URL}/campaigns`);
    return response.data;
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    throw error;
  }
};

export const fetchCampaignDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/campaigns/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching campaign details for id ${id}:`, error);
    throw error;
  }
};
