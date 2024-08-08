import axios from 'axios';

const API_URL = 'https://safeurl.dk/api'; // Updated GoPhish API URL
const API_KEY = '2956b7480392191b9ab24b159548719c305a8ad5ccf16ceb8f1d933d489228b0';

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
