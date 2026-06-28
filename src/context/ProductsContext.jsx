import { createContext, useContext, useState, useEffect } from 'react'
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/api'

const ProductsContext = createContext()

export function ProductsProvider({ children }) 
{
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

// Delay temporal para probar el loading, se borra luego
useEffect(() => {
  new Promise(resolve => setTimeout(resolve, 3000))
    .then(() => getProducts())
    .then(data => setProducts(data))
    .catch(err => setError(err.message))
    .finally(() => setLoading(false))
}, [])
//se borra luego hasta acá

  useEffect(() => {
    getProducts()
      .then(data => setProducts(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const addProduct = async (productData) => {
    const newProduct = await createProduct(productData)
    setProducts(prev => [...prev, newProduct])
  }

  const editProduct = async (id, productData) => {
    const updated = await updateProduct(id, productData)
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updated } : p))
    )
  }

  const removeProduct = async (id) => {
    await deleteProduct(id)
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  return (
    <ProductsContext.Provider
      value={{ products, loading, error, addProduct, editProduct, removeProduct }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export function useProductsContext() 
{
  return useContext(ProductsContext)
}