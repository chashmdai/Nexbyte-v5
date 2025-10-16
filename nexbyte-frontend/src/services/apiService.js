import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// ===============================================
// SERVICIOS PARA PRODUCTOS
// ===============================================
export const getProductos = () => apiClient.get('/productos');
export const getProductoById = (id) => apiClient.get(`/productos/${id}`);
export const createProducto = (producto) => apiClient.post('/productos', producto);
export const updateProducto = (id, producto) => apiClient.put(`/productos/${id}`, producto);
export const desactivarProducto = (id) => apiClient.patch(`/productos/${id}/desactivar`);

// ===============================================
// SERVICIOS PARA CATEGORÍAS
// ===============================================
export const getCategorias = () => apiClient.get('/categorias');
export const createCategoria = (categoria) => apiClient.post('/categorias', categoria);

// ===============================================
// SERVICIOS PARA CONTACTO
// ===============================================
export const sendContactMessage = (messageData) => {
  // Cuando conectemos al backend, esto será una llamada apiClient.post('/contactos', messageData)
  // Por ahora, simulamos una respuesta exitosa.
  console.log('Enviando mensaje de contacto:', messageData);
  return Promise.resolve({ data: { message: 'Mensaje enviado con éxito' } });
};