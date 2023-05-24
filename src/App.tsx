import './App.css'
import { Route, Routes, BrowserRouter, RouteObject } from 'react-router-dom'
import ROUTES from './configuration/constants/routes'
import Header from './components/Header'

function App() {
  return (
    <BrowserRouter>
      <div className={'body flex flex-col gap-8'}>
        <Header />
        <main>
          <Routes>
            {ROUTES.map((route: RouteObject) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
