import './App.css'
import { Route, Routes, BrowserRouter, RouteObject } from 'react-router-dom'
import ROUTES from './configuration/constants/routes'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {ROUTES.map((route: RouteObject) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  )
}

export default App
