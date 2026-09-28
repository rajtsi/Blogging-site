import React from 'react'
import { useEffect } from 'react'
import Home from './pages/Home'
// import Blog from './pages/Blog'
import { Navigate, Route, Routes } from 'react-router-dom'
// import AddBlog from './pages/admin/AddBlog'
// import Comments from './pages/admin/Comments'
// import Dashboard from './pages/admin/Dashboard'
// import Layout from './pages/admin/Layout'
// import ListBlog from './pages/admin/ListBlog'
import Login from './components/Login'
import Signup from './components/Signup'
import 'quill/dist/quill.snow.css'
import { Toaster } from 'react-hot-toast'
import { useAppContext } from './context/AppContext'
// import UserLayout from './pages/user/Layout'
// import UserDashboard from './pages/user/Dashboard'
// import ProtectedRoute from './components/ProtectedRoute'
// import UserAddBlog from './pages/user/AddBlog'
// import BlogDetails from './pages/BlogDetails'
// import GuestRoute from './components/GuestRoute'



const App = () => {
  const { token } = useAppContext();
  const { navigate } = useAppContext();
  return (
    <div>
      <Toaster />
      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={
            token ? (
              <Home />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Signup */}
        <Route
          path="/signup"
          element={<Signup />}
        />
      </Routes>
    </div>
  )
}

export default App