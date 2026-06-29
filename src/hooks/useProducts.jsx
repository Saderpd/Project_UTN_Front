import { useState, useEffect } from 'react'
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/api'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getProducts()
      .then(data => setProducts(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, 
  [])

  const addProduct = async (productData) => {
    try {
      const newProduct = await createProduct(productData)
      setProducts(prev => [...prev, newProduct])
    } catch (err) {
      setError(err.message)
    }
  }

  const editProduct = async (id, productData) => {
    try {
      const updated = await updateProduct(id, productData)
      setProducts(prev =>
        prev.map(p => (p.id === id ? { ...p, ...updated } : p))
      )
    } catch (err) {
      setError(err.message)
    }
  }

  const removeProduct = async (id) => {
    try {
      await deleteProduct(id)
      setProducts(prev => prev.filter(p => p.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  return { products, loading, error, addProduct, editProduct, removeProduct }
}