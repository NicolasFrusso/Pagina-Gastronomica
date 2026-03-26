import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AdminPage } from './pages/AdminPage'
import { MenuPage } from './pages/MenuPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MenuPage />} path="/" />
        <Route element={<AdminPage />} path="/admin" />
        <Route element={<Navigate replace to="/" />} path="*" />
      </Routes>
    </BrowserRouter>
  )
}

export default App
