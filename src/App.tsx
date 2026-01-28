
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Chatbot from './components/Chatbot'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Layout from './components/Layout'

function App() {

  return (
    <>
     <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute/>}>
            <Route element={<Layout/>}>
              <Route path="/" element={<Chatbot/>} />
            </Route>
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </>
  )
}

export default App
