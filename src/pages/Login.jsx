import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuthContext()
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    try {
      login(formData.email, formData.password)
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section className="flex justify-center items-center py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-md bg-white border border-primary/25 rounded-xl p-4 shadow-sm"
      >
        <h1 className="text-3xl font-display font-semibold text-primary mb-2">Login</h1>

        {error && (
          <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-2">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-primary">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="ejemplo@correo.com"
            value={formData.email}
            onChange={handleChange}
            className="border border-primary/20 rounded-lg p-3 focus:outline-none focus:border-primary"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-medium text-primary">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            className="border border-primary/20 rounded-lg p-3 focus:outline-none focus:border-primary"
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white py-3 rounded-lg mt-2 hover:opacity-90 transition-opacity"
        >
          Ingresar
        </button>
      </form>
    </section>
  )
}

export default Login