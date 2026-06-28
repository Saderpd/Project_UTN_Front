import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import { useProductsContext } from '../context/ProductsContext'

function ProductCard({ product }) {
  const { id, title, price, image, category } = product
  const { user } = useAuthContext()
  const { removeProduct } = useProductsContext()
  const navigate = useNavigate()

  const isAdmin = user?.rol === 'admin'

  const handleDelete = (e) => {
    e.preventDefault()
    e.stopPropagation()
    removeProduct(id)
  }

  const handleEdit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    navigate(`/admin/edit-product/${id}`)
  }

  return (
    <Link
      to={`/product/${id}`}
      className="relative flex flex-col bg-white border border-primary/15 rounded-lg p-4 hover:shadow-md transition-shadow"
    >
      <img
        src={image}
        alt={title}
        className="h-48 w-full object-contain mb-4"
      />
      <span className="text-xs uppercase text-primary/60 mb-1">
        {category}
      </span>
      <h3 className="font-medium text-primary line-clamp-2 mb-2">
        {title}
      </h3>
      <span className="text-lg font-semibold text-primary">
        ${price}
      </span>

      {isAdmin && (
        <div className="flex gap-2 mt-3">
          <button
            onClick={handleEdit}
            className="text-sm border border-primary px-3 py-1 rounded"
          >
            Editar
          </button>
          <button
            onClick={handleDelete}
            className="text-sm border border-red-600 text-red-600 px-3 py-1 rounded"
          >
            Borrar
          </button>
        </div>
      )}
    </Link>
  )
}

export default ProductCard