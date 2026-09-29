import React from 'react'
import Home from './pages/Home'
import Blog from './pages/Blog'
import { Route, Routes } from 'react-router-dom'
import AddBlog from './pages/admin/AddBlog'
import Comments from './pages/admin/Comments'
import Dashboard from './pages/admin/Dashboard'
import Layout from './pages/admin/Layout'
import ListBlog from './pages/admin/ListBlog'
import Login from './components/Login'
import Signup from './components/Signup'
import 'quill/dist/quill.snow.css'
import { Toaster } from 'react-hot-toast'
import { useAppContext } from './context/AppContext'
import ProtectedRoute from './components/ProtectedRoute'
import BlogDetails from './pages/BlogDetails'

const App = () => {
  const { authLoading } = useAppContext();

  if (authLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Toaster />

      <Routes>

        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Logged-in users */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:id" element={<Blog />} />
        </Route>

        {/* Admin only */}
        <Route element={<ProtectedRoute role="admin" />}>
          <Route path="/admin" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="addBlog" element={<AddBlog />} />
            <Route path="listBlog" element={<ListBlog />} />
            <Route path="comments" element={<Comments />} />
            <Route path="blog/:id" element={<BlogDetails />} />
          </Route>
        </Route>

      </Routes>
    </div>
  )
}

export default App