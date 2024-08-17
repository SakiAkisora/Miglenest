import React, { useState } from 'react';
import home from '../assets/image/casa.png';
import category from '../assets/image/etiqueta.png';
import saved from '../assets/image/estrella.png';
import likes from '../assets/image/corazon.png';
import settings from '../assets/image/configuraciones.png';
import info from '../assets/image/lentes.png';
import '../assets/styles/asideMenu.css';

export const AsideMenu = ({ isMenuActive }) => {
    const [activeItem, setActiveItem] = useState('home');

    const handleIconClick = (item) => {
        setActiveItem(item);
    };

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
    );
};