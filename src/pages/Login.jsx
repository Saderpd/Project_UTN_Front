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
    <section className="flex justify-center items-center py-16 px-4v">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md bg-white border border-primary/10 rounded-xl p-8 shadow-sm">
        <h1 className="text-2xl font-display font-semibold text-primary">Login</h1>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div className="grupo-form">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="ejemplo@correo.com"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <div className="grupo-form">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="btn bg-primary text-white py-3 rounded-lg">
          Ingresar
        </button>
      </form>
    </section>
  )
}

export default Login