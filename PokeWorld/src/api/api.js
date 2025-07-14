import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

// Interceptor para incluir el token en cada petición
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
