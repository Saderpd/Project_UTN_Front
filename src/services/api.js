/* fakestoreapi.com */
const BASE_URL = 'https://fakestoreapi.com'

export const getProducts = () => 
  fetch(`${BASE_URL}/products`).then(res => res.json())

export const getProductById = (id) => 
  fetch(`${BASE_URL}/products/${id}`).then(res => res.json())

export const getCategories = () => 
  fetch(`${BASE_URL}/products/categories`).then(res => res.json())

export const getProductsByCategory = (category) => 
  fetch(`${BASE_URL}/products/category/${category}`).then(res => res.json())

export const createProduct = (productData) => 
  fetch(`${BASE_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  }).then(res => res.json())

export const updateProduct = (id, productData) => 
  fetch(`${BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  }).then(res => res.json())

export const deleteProduct = (id) => 
  fetch(`${BASE_URL}/products/${id}`, {
    method: 'DELETE',
  }).then(res => res.json())