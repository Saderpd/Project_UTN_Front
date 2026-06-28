import { useParams, Link } from 'react-router-dom'
import { useProductsContext } from '../context/ProductsContext'
import { useCartContext } from '../context/CartContext'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'

function ProductDetail() {
  const { id } = useParams()
  const { products, loading, error } = useProductsContext()
  const { addToCart } = useCartContext()

  if (loading) return <Loader message="Cargando producto..." />
  if (error) return <ErrorMessage message="No pudimos cargar el producto" />

  const product = products.find(p => p.id === Number(id))

  if (!product) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-xl font-display font-semibold mb-4">Producto no encontrado</h1>
        <Link to="/" className="underline">Volver a la tienda</Link>
      </div>
    )
  }

  const { title, price, description, image, category, rating } = product
/* estrella emoji de google */
  return (
    <div className="p-6 grid md:grid-cols-2 gap-8">
      <img
        src={image}
        alt={title}
        className="h-80 object-contain mx-auto"
      />

      <div className="flex flex-col gap-4">
        <span className="text-xs uppercase text-primary/60">{category}</span>
        <h1 className="text-2xl font-display font-semibold text-primary">{title}</h1>
        <span className="text-xl font-semibold">${price}</span>

        {rating && (
          <span className="text-sm text-primary/60">
            ⭐ {rating.rate} ({rating.count} reseñas)
          </span>
        )}

        <p className="text-primary/80">{description}</p>

        <button
          onClick={() => addToCart(product)}
          className="mt-4 bg-primary text-white py-3 px-6 rounded-lg w-fit hover:opacity-90 transition-opacity"
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  )
}

export default ProductDetail