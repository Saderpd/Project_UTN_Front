import { useProductsContext } from '../context/ProductsContext'
import ProductList from '../components/ProductList'
import Loader from '../components/Loader'
import homeFondo from '../assets/homeFondo.mp4'

function Home() {
  const { products, loading, error } = useProductsContext()

  if (loading) return <>
  <Loader message="Buscando para vos los mejores productos..." />
  </>
  if (error) return <>
  <ErrorMessage message="No pudimos cargar los productos" />
  </>

  return ( <>
    <div className="p-4 bg-secondary">
      <div className="relative w-full h-[80vh] overflow-hidden rounded-2xl">
        <video src={homeFondo} autoPlay loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/40" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-4xl md:text-6xl font-display font-semibold text-white mb-4">
          Todo lo que necesitás, más cerca.
        </h1>
        <p className="text-white/90 text-lg max-w-xl">
          Descubrí los mejores productos seleccionados para vos
        </p>
      </div>
      </div>
      <h1 className="text-2xl font-display font-semibold mb-4 text-primary pt-10">Para vos</h1>
      <ProductList products={products} />
    </div>
    </>
  )
}

export default Home