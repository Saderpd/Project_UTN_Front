import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

function Register() {
  const navigate = useNavigate()
  const { register } = useAuthContext()
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmarPassword: '',
    pais: 'ar',
    genero: '',
    terminos: false,
    newsletter: false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmarPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    try {
      register(formData)
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
        <h1 className="text-3xl font-display font-semibold text-primary mb-2">Registrate</h1>

        {error && (
          <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-2">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-1">
          <label htmlFor="nombre" className="text-sm font-medium text-primary">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="border border-primary/20 rounded-lg p-3 focus:outline-none focus:border-primary"
          />
        </div>

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

        <div className="grid grid-cols-2 gap-3">
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
          <div className="flex flex-col gap-1">
            <label htmlFor="confirmarPassword" className="text-sm font-medium text-primary">Repetir Contraseña:</label>
            <input
              type="password"
              id="confirmarPassword"
              name="confirmarPassword"
              placeholder="Confirmar Contraseña"
              value={formData.confirmarPassword}
              onChange={handleChange}
              className="border border-primary/20 rounded-lg p-3 focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="pais" className="text-sm font-medium text-primary">País:</label>
          <select
            name="pais"
            id="pais"
            value={formData.pais}
            onChange={handleChange}
            className="border border-primary/20 rounded-lg p-3 focus:outline-none focus:border-primary"
          >
            <option value="ar">Argentina</option>
            <option value="br">Brasil</option>
            <option value="cl">Chile</option>
            <option value="co">Colombia</option>
            <option value="mx">México</option>
            <option value="pe">Perú</option>
            <option value="uy">Uruguay</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-primary">Genero:</label>
          <div className="flex gap-4">
            <span className="flex items-center gap-1">
              <input
                type="radio"
                id="masculino"
                name="genero"
                value="masculino"
                checked={formData.genero === 'masculino'}
                onChange={handleChange}
              />
              <label htmlFor="masculino" className="text-sm text-primary">Masculino</label>
            </span>
            <span className="flex items-center gap-1">
              <input
                type="radio"
                id="femenino"
                name="genero"
                value="femenino"
                checked={formData.genero === 'femenino'}
                onChange={handleChange}
              />
              <label htmlFor="femenino" className="text-sm text-primary">Femenino</label>
            </span>
            <span className="flex items-center gap-1">
              <input
                type="radio"
                id="otro"
                name="genero"
                value="otro"
                checked={formData.genero === 'otro'}
                onChange={handleChange}
              />
              <label htmlFor="otro" className="text-sm text-primary">Otro</label>
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="flex items-start gap-2">
            <input
              type="checkbox"
              id="terminos"
              name="terminos"
              checked={formData.terminos}
              onChange={handleChange}
              className="mt-1"
            />
            <label htmlFor="terminos" className="text-sm text-primary/80">
              Acepto los términos, condiciones y la política de privacidad.
            </label>
          </span>
          <span className="flex items-start gap-2">
            <input
              type="checkbox"
              id="newsletter"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleChange}
              className="mt-1"
            />
            <label htmlFor="newsletter" className="text-sm text-primary/80">
              Suscríbete a nuestra newsletter para recibir ofertas semanales.
            </label>
          </span>
        </div>

        <button
          type="submit"
          className="bg-primary text-white py-3 rounded-lg mt-2 hover:opacity-90 transition-opacity"
        >
          Registrate
        </button>
      </form>
    </section>
  )
}

export default Register