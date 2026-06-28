import { useProductsContext } from '../context/ProductsContext'
import ProductList from '../components/ProductList'
import Loader from '../components/Loader'

function Home() {
  const { products, loading, error } = useProductsContext()

  if (loading) return <>
  <Loader message="Buscando para vos los mejores productos..." />
  </>
  if (error) return <>
  <ErrorMessage message="No pudimos cargar los productos" />
  </>

  return ( <>
    <div className="p-4">
      <h1 className="text-2xl font-display font-semibold mb-4 text-primary">Para vos</h1>
      <ProductList products={products} />
    </div>
    </>
  )
}

export default Home