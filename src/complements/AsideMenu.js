import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import home from '../assets/image/homeIcon.png'
import category from '../assets/image/category.png'
import saved from '../assets/image/favorite.png'
import likes from '../assets/image/heart.png'
import settings from '../assets/image/settings.png'
import info from '../assets/image/help.png'
import '../assets/styles/asideMenu.css'

export const AsideMenu = ({ isMenuActive, setIsMenuActive }) => {
  const [activeItem, setActiveItem] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const path = location.pathname.split('/')[1]
    setActiveItem(path)
  }, [location])

  const handleIconClick = (item) => {
    setActiveItem(item)
    switch (item) {
      case 'home':
        navigate('/home')
        setActiveItem('home')
        setIsMenuActive(true)
        break
      case 'category':
        navigate('/category')
        setActiveItem('category')
        setIsMenuActive(true)
        break
      case 'saved':
        navigate('/saved')
        setActiveItem('saved')
        setIsMenuActive(true)
        break
      case 'likes':
        navigate('/likes')
        setActiveItem('likes')
        setIsMenuActive(true)
        break
      case 'settings':
        navigate('/settings/account')
        setActiveItem('settings')
        setIsMenuActive(false)
        break
      case 'info':
        navigate('/information/about-us')
        setActiveItem('info')
        setIsMenuActive(false)
        break
      default:
        navigate('/home')
        break
    }
  }

  return (
        <div className={`containerAside ${isMenuActive ? 'active' : ''}`}>
            <div className="icons">
                <div
                    className={`icon-item ${activeItem === 'home' ? 'active' : ''}`}
                    onClick={() => handleIconClick('home')}
                >
                    <img src={home} alt="Icono de inicio" />
                    {isMenuActive && <span>Inicio</span>}
                </div>
                <div
                    className={`icon-item ${activeItem === 'category' ? 'active' : ''}`}
                    onClick={() => handleIconClick('category')}
                >
                    <img src={category} alt="Icono de categoría" />
                    {isMenuActive && <span>Categorías</span>}
                </div>
                <div
                    className={`icon-item ${activeItem === 'saved' ? 'active' : ''}`}
                    onClick={() => handleIconClick('saved')}
                >
                    <img src={saved} alt="Icono de guardados" />
                    {isMenuActive && <span>Guardados</span>}
                </div>
                <div
                    className={`icon-item ${activeItem === 'likes' ? 'active' : ''}`}
                    onClick={() => handleIconClick('likes')}
                >
                    <img src={likes} alt="Icono de me gusta" />
                    {isMenuActive && <span>Tus me gusta</span>}
                </div>
                <div
                    className={`icon-item ${activeItem === 'settings' ? 'active' : ''}`}
                    onClick={() => handleIconClick('settings')}
                >
                    <img src={settings} alt="Icono de configuraciones" />
                    {isMenuActive && <span>Configuración</span>}
                </div>
                <div
                    className={`icon-item ${activeItem === 'info' ? 'active' : ''}`}
                    onClick={() => handleIconClick('info')}
                >
                    <img src={info} alt="Icono de información" />
                    {isMenuActive && <span>Información</span>}
                </div>
            </div>
        </div>
  )
}
