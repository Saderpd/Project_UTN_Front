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
    <section className="register max-w-md mx-auto p-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h1 className="text-2xl font-display font-semibold text-primary">Registrate</h1>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div className="grupo-form">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
        </div>

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
          <div className="grupo-form">
            <label htmlFor="confirmarPassword">Repetir Contraseña:</label>
            <input
              type="password"
              id="confirmarPassword"
              name="confirmarPassword"
              placeholder="Confirmar Contraseña"
              value={formData.confirmarPassword}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grupo-form">
          <label htmlFor="pais">País:</label>
          <select
            name="pais"
            id="pais"
            value={formData.pais}
            onChange={handleChange}
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

        <div className="grupo-form">
          <div>
            <label>Genero:</label>
          </div>
          <div className="option-genero-form flex gap-4">
            <span>
              <input
                type="radio"
                id="masculino"
                name="genero"
                value="masculino"
                checked={formData.genero === 'masculino'}
                onChange={handleChange}
              />
              <label htmlFor="masculino">Masculino</label>
            </span>
            <span>
              <input
                type="radio"
                id="femenino"
                name="genero"
                value="femenino"
                checked={formData.genero === 'femenino'}
                onChange={handleChange}
              />
              <label htmlFor="femenino">Femenino</label>
            </span>
            <span>
              <input
                type="radio"
                id="otro"
                name="genero"
                value="otro"
                checked={formData.genero === 'otro'}
                onChange={handleChange}
              />
              <label htmlFor="otro">Otro</label>
            </span>
          </div>
        </div>

        <div className="grupo-form">
          <div className="checkbox-form">
            <input
              type="checkbox"
              id="terminos"
              name="terminos"
              checked={formData.terminos}
              onChange={handleChange}
            />
            <label htmlFor="terminos">
              Acepto los términos, condiciones y la política de privacidad.
            </label>
          </div>
          <div className="checkbox-form">
            <input
              type="checkbox"
              id="newsletter"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleChange}
            />
            <label htmlFor="newsletter">
              Suscríbete a nuestra newsletter para recibir ofertas semanales.
            </label>
          </div>
        </div>

        <button type="submit" className="btn bg-primary text-white py-3 rounded-lg">
          Registrate
        </button>
      </form>
    </section>
  )
}

export default Register