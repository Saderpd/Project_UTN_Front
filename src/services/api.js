/* fakestoreapi.com */
const BASE_URL = 'https://fakestoreapi.com'

/* Lectura */
export const getProducts = () => 
  fetch(`${BASE_URL}/products`).then(response => response.json())

export const getProductById = (id) => 
  fetch(`${BASE_URL}/products/${id}`).then(response => response.json())

export const getCategories = () => 
  fetch(`${BASE_URL}/products/categories`).then(response => response.json())

export const getProductsByCategory = (category) => 
  fetch(`${BASE_URL}/products/category/${category}`).then(response => response.json())

/* Creación */
export const createProduct = (productData) => 
  fetch(`${BASE_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  }).then(response => response.json())

/* Edición */
export const updateProduct = (id, productData) => 
  fetch(`${BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  }).then(response => response.json())

/* Eliminación */
export const deleteProduct = (id) => 
  fetch(`${BASE_URL}/products/${id}`, {
    method: 'DELETE',
  }).then(response => response.json())