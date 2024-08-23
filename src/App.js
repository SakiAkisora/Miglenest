import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { HeaderMain } from './complements/header';
import { AsideMenu } from './complements/AsideMenu';
import Home from './pages/home';
import Category from './pages/category';
import Login from './pages/Login';
import VideosSaved from './pages/VideoSaved';
import VideosLiked from './pages/VideosLiked';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade">
        <Routes location={location}>
          <Route path="/home" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/saved" element={<VideosSaved />} />
          <Route path= "/likes" element={<VideosLiked />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

function Layout() {
  const [isMenuActive, setIsMenuActive] = useState(true);

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  return (
    <>
      <HeaderMain isActive={isMenuActive} toggleMenu={toggleMenu} />
      <AsideMenu isMenuActive={isMenuActive} setIsMenuActive={setIsMenuActive} />
      <AnimatedRoutes />
    </>
  );
}

function App() {
  return (  
    <div>
      <Routes>
        <Route path="/*" element={<Layout />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
