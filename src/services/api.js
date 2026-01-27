import axios from "axios";

const API_URL = "https://ecommerce-backend.onrender.com";

export  const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem("Token"); // make sure token is saved
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Products
export const getProducts = () => api.get("/products");
export const createProduct = (data) =>
  api.post("/products", data);


export const updateProduct = (id, data) =>
  api.put(`/products/${id}`, data);
export const updateProductStatus = (id, status) =>
  api.put(`/products/status/${id}`, { status });

export const uploadImages = (formData) => {
  return axios.post(`${API_URL}/products/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const getProductById = (id) =>
  api.get(`/products/${id}`);
// Categories
export const getCategories = () => api.get("/categories");
export const getCategoriesbyid = (id) => api.get(`/products/category/${id}`);
export const createCategory = (data) => api.post("/categories", data);
export const updateCategory = (id, data) => api.put(`/categories/${id}`, data);
export const deleteCategory = (id) => api.delete(`/categories/${id}`);

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});