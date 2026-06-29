import { createContext, useContext } from 'react'
import { useProducts } from '../hooks/useProducts'

const ProductsContext = createContext()

export function ProductsProvider({ children }) {
  const productsData = useProducts()

  return (
    <ProductsContext.Provider value={productsData}>
      {children}
    </ProductsContext.Provider>
  )
}

export function useProductsContext() {
  return useContext(ProductsContext)
}