import { createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Cart from './pages/Cart.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import NotFound from './pages/NotFound.jsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { 
        index: true, 
        element: <Home /> 
      },
      { 
        path: 'products', element: <Products /> 
      },
      { 
        path: 'product/:id', 
        element: <ProductDetail /> 
      },
      { 
        path: 'cart', 
        element: <Cart /> 
      },
      {
        path: 'login', 
        element: <Login /> 
     },
      { 
        path: 'register', 
        element: <Register /> 
      },
    ],
  },
  /* capturar cualquier ruta que no exista */
  { 
    path: '*', 
    element: <NotFound /> 
},
])