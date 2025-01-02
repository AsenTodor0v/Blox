import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import PostDetail from './pages/PostDetail';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ProfileUpdate from './pages/ProfileUpdate';


function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />
}
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/posts/create" element={<CreatePost />} />
        <Route path="/editmeal/:id" element={<EditPost />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/profile/" element={<Profile />} />
        <Route path="/profile/update" element={<ProfileUpdate />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
