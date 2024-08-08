import axios from 'axios';

const API_URL = 'https://safeurl.dk/api';

export const fetchCampaigns = async () => {
  try {
    const response = await axios.get(`${API_URL}/campaigns`, {
      headers: {
        'Authorization': '2956b7480392191b9ab24b159548719c305a8ad5ccf16ceb8f1d933d489228b0'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    throw error;
  }
};

export const fetchCampaignDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/campaigns/${id}`, {
      headers: {
        'Authorization': '2956b7480392191b9ab24b159548719c305a8ad5ccf16ceb8f1d933d489228b0'
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching campaign details for id ${id}:`, error);
    throw error;
  }
};
