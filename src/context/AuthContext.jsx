import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

const ADMIN_CREDENTIALS = {
  email: 'admin@tienda.com',
  password: 'admin123',
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('currentUser')
    return stored ? JSON.parse(stored) : null
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user))
    } else {
      localStorage.removeItem('currentUser')
    }
  }, [user])

  const register = (formData) => {
    const users = JSON.parse(localStorage.getItem('users')) || []

    const yaExiste = users.some(u => u.email === formData.email)
    if (yaExiste) {
      throw new Error('Ya existe una cuenta con ese email')
    }

    const newUser = { ...formData, rol: 'cliente' }
    delete newUser.confirmarPassword

    const updatedUsers = [...users, newUser]
    localStorage.setItem('users', JSON.stringify(updatedUsers))

    setUser(newUser)
  }

  const login = (email, password) => {
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      setUser({ nombre: 'Administrador', email, rol: 'admin' })
      return
    }

    const users = JSON.parse(localStorage.getItem('users')) || []

    const found = users.find(
      u => u.email === email && u.password === password
    )

    if (!found) {
      throw new Error('Email o contraseña incorrectos')
    }

    setUser(found)
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  return useContext(AuthContext)
}