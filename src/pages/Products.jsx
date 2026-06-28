import { useState } from 'react'
import { useProductsContext } from '../context/ProductsContext'
import ProductList from '../components/ProductList'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'

function Products() {
  const { products, loading, error } = useProductsContext()
  const [search, setSearch] = useState('')

  if (loading) return <Loader message="Buscando los mejores productos..." />
  if (error) return <ErrorMessage message="No pudimos cargar los productos" />

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-4">
      <h1 className="text-2xl font-display font-semibold mb-4 text-primary">
        Catálogo
      </h1>

      <input
        type="text"
        placeholder="Buscar productos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-primary/20 rounded-lg p-3 mb-6 w-full max-w-md"
      />

      {filteredProducts.length === 0 ? (
        <p className="text-primary/60">No se encontraron productos.</p>
      ) : (
        <ProductList products={filteredProducts} />
      )}
    </div>
  )
}

export default Products