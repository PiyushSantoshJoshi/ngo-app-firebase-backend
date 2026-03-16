import axios from 'axios';
import { API_BASE_URL } from '../config';

const ngoAPI = {
  // Search NGOs
  searchNgos: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.city) params.append('city', filters.city);
      if (filters.name) params.append('name', filters.name);
      
      const response = await axios.get(`${API_BASE_URL}/searchNgos?${params}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Search failed' };
    }
  },

  // Get pending NGOs (admin only)
  getPendingNgos: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/pendingNgos`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch pending NGOs' };
    }
  },

  // Approve NGO (admin only)
  approveNgo: async (ngoId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/admin/approveNgo`, { ngoId });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Approval failed' };
    }
  },

  // Get NGO details
  getNgoDetails: async (ngoId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/ngoDetails/${ngoId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch NGO details' };
    }
  }
};

export default ngoAPI;
