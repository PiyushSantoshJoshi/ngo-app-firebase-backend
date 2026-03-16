import axios from 'axios';
import { API_BASE_URL } from '../config';

const messagesAPI = {
  sendMessage: async (messageData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/messages/send`, {
        ...messageData,
        messageType: messageData.messageType || 'personal'
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to send message' };
    }
  },

  sendBroadcast: async ({ from, message, recipientType = 'all' }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/messages/broadcast`, {
        from,
        message,
        recipientType
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to send broadcast' };
    }
  },

  getConversations: async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/messages/conversations/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch conversations' };
    }
  },

  getMessagesBetween: async (userId1, userId2, limit = 50) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/messages/${userId1}/${userId2}`, {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch messages' };
    }
  },

  getUnreadCount: async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/messages/unread/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch unread count' };
    }
  },

  markRead: async ({ userId, messageIds }) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/messages/mark-read`, { userId, messageIds });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to mark messages as read' };
    }
  },

  getBroadcasts: async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/messages/broadcasts/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch broadcasts' };
    }
  }
};

export default messagesAPI;