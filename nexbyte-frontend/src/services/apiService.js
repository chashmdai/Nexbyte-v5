// src/services/apiService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('nexbyte_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export const getProductos = () => apiClient.get('/productos');
export const getProductoById = (id) => apiClient.get(`/productos/${id}`);
export const createProducto = (producto) => apiClient.post('/productos', producto);
export const updateProducto = (id, producto) => apiClient.put(`/productos/${id}`, producto);
export const desactivarProducto = (id) => apiClient.patch(`/productos/${id}/desactivar`);

export const getCategorias = () => apiClient.get('/categorias');
export const createCategoria = (categoria) => apiClient.post('/categorias', categoria);

export const sendContactMessage = (messageData) => apiClient.post('/contactos', messageData);

export const sendSupportRequest = (supportData) => apiClient.post('/soporte', supportData);

export const loginUser = (credentials) => apiClient.post('/auth/login', credentials);
export const registerUser = (userData) => apiClient.post('/auth/registro', userData);

export const logoutUser = () => {
  localStorage.removeItem('nexbyte_token');
  window.dispatchEvent(new Event('auth-change'));
};

export default apiClient;
