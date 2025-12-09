import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  // Try to get token from localStorage (most reliable)
  let token = null;
  try {
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }
  } catch (e) {
    console.warn('Failed to read token from localStorage:', e);
  }
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    // Remove Authorization header if no token (to avoid sending invalid headers)
    delete config.headers.Authorization;
  }
  return config;
});

// Auth endpoints
export const authApi = {
  signup: (email: string, password: string) =>
    api.post('/auth/signup', { email, password }),
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data: any) => api.patch('/auth/me', data),
};

// Query endpoints
export const queryApi = {
  ask: (query: string) => api.post('/query', { query }),
};

// Document endpoints
export const documentApi = {
  list: () => api.get('/documents'),
  upload: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  delete: (id: number) => api.delete(`/documents/${id}`),
};

// Vector search
export const vectorApi = {
  search: (query: string, limit = 10) =>
    api.post('/vectors/search', { query, limit }),
};

// Gmail endpoints
export const gmailApi = {
  summary: (period: 'today' | 'week' | 'month') =>
    api.get(`/gmail/summary/${period}`),
  emails: (params?: any) => api.get('/gmail/emails', { params }),
  send: (to: string, subject: string, body: string) =>
    api.post('/gmail/send', { to, subject, body }),
};

// Calendar endpoints
export const calendarApi = {
  events: (period: 'today' | 'week' | 'month') =>
    api.get(`/calendar/events/${period}`),
  create: (data: any) => api.post('/calendar/events', data),
};

// Briefing endpoint
export const briefingApi = {
  get: () => api.get('/briefing'),
  quick: () => api.get('/briefing/quick'),
};

// Weather endpoint
export const weatherApi = {
  current: (city: string) => api.get(`/weather/current?city=${city}`),
};

// Tasks endpoint
export const taskApi = {
  list: () => api.get('/tasks'),
  create: (data: any) => api.post('/tasks', data),
  update: (id: number, data: any) => api.patch(`/tasks/${id}`, data),
  delete: (id: number) => api.delete(`/tasks/${id}`),
};

export default api;

