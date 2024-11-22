import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { HeaderMain } from './complements/header.js'
import { AsideMenu } from './complements/AsideMenu.js'
import Home from './pages/home.js'
import Category from './pages/category.js'
import Login from './pages/Login.js'
import VideosSaved from './pages/VideoSaved.js'
import VideosLiked from './pages/VideosLiked.js'
import { Configuration } from './pages/configuration.js'
import './App.css'
import { Information } from './pages/information.js'
import { Profile } from './pages/profile.js'
import { CreatePost } from './pages/CreatePost.js'
import { SearchPostsResults } from './complements/searchPostsResults.js';
import PostPage from './complements/PostPage.js'  // Asegúrate de tener un componente para el post

function AnimatedRoutes () {
  const location = useLocation()

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={0}>
        <Routes location={location}>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/saved" element={<VideosSaved />} />
          <Route path="/likes" element={<VideosLiked />} />
          <Route path="/settings/*" element={<Configuration />} />
          <Route path="/information/*" element={<Information />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create" element={<CreatePost />} />
          
          {/* Ruta para la publicación con ID codificado en Base64 */}
          <Route path="/watch" element={<PostPage />} />
          <Route path="/search" element={<SearchPostsResults />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  )
}

function Layout () {
  const [isMenuActive, setIsMenuActive] = useState(true)

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive)
  }

  return (
    <>
      <AsideMenu isMenuActive={isMenuActive} setIsMenuActive={setIsMenuActive} />
      <HeaderMain isActive={isMenuActive} toggleMenu={toggleMenu} />
      <AnimatedRoutes />
    </>
  )
}

function App () {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<Layout />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

function AppWrapper () {
  return (
    <Router>
      <App />
    </Router>
  )
}

export default AppWrapper
