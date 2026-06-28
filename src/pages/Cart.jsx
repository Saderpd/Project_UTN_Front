import { Link } from 'react-router-dom'
import { useCartContext } from '../context/CartContext'

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCartContext()

  if (cartItems.length === 0) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-xl font-display font-semibold mb-4">Tu carrito está vacío</h1>
        <Link to="/" className="underline">Ir a la tienda</Link>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-display font-semibold mb-6">Tu carrito</h1>

      <div className="flex flex-col gap-4">
        {cartItems.map(item => (
          <div
            key={item.id}
            className="flex items-center gap-4 border border-primary/10 rounded-lg p-4"
          >
            <img src={item.image} alt={item.title} className="h-20 w-20 object-contain" />

            <div className="flex-1">
              <h3 className="font-medium text-primary">{item.title}</h3>
              <span className="text-sm text-primary/60">${item.price}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="px-2 border rounded"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="px-2 border rounded"
              >
                +
              </button>
            </div>

            <span className="font-semibold w-20 text-right">
              ${(item.price * item.quantity).toFixed(2)}
            </span>

            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-600 underline text-sm"
            >
              Quitar
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 text-right">
        <span className="text-xl font-display font-semibold">
          Total: ${totalPrice.toFixed(2)}
        </span>
      </div>
    </div>
  )
}

export default Cart