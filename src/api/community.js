import axios from 'axios';
import { API_BASE_URL } from '../config';

const api = axios.create({ baseURL: API_BASE_URL });

export const announcementsAPI = {
  getList: (limit = 5) => api.get('/announcements', { params: { limit } }).then(r => r.data),
  create: (data) => api.post('/announcements', data).then(r => r.data),
};

export const eventsAPI = {
  getList: (upcomingOnly = false) => api.get('/events', { params: upcomingOnly ? { upcoming: 'true' } : {} }).then(r => r.data),
  create: (data) => api.post('/events', data).then(r => r.data),
};

export const contactAPI = {
  submit: (data) => api.post('/contact', data).then(r => r.data),
};

export const newsletterAPI = {
  subscribe: (email) => api.post('/newsletter/subscribe', { email }).then(r => r.data),
};

export const volunteerAPI = {
  submitInterest: (data) => api.post('/volunteer/interest', data).then(r => r.data),
};

export const testimonialsAPI = {
  getList: () => api.get('/testimonials').then(r => r.data),
  submit: (data) => api.post('/testimonials', data).then(r => r.data),
};

// Admin
export const adminCommunityAPI = {
  getContactSubmissions: () => api.get('/admin/contact-submissions').then(r => r.data),
  getVolunteerInterests: () => api.get('/admin/volunteer-interests').then(r => r.data),
  getTestimonials: () => api.get('/admin/testimonials').then(r => r.data),
  approveTestimonial: (id) => api.post(`/admin/testimonials/${id}/approve`).then(r => r.data),
};
