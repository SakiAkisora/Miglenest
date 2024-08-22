import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import home from '../assets/image/homeIcon.png';
import category from '../assets/image/category.png';
import saved from '../assets/image/favorite.png';
import likes from '../assets/image/heart.png';
import settings from '../assets/image/settings.png';
import info from '../assets/image/help.png';
import '../assets/styles/asideMenu.css';

export const AsideMenu = ({ isMenuActive }) => {
    const [activeItem, setActiveItem] = useState('home');
    const navigate = useNavigate(); // Inicializa useNavigate

    const handleIconClick = (item) => {
        setActiveItem(item);

        // Redirige según el ítem clicado
        switch (item) {
            case 'home':
                navigate('/home');
                break;
            case 'category':
                navigate('/category');
                break;
            case 'saved':
                navigate('/saved'); // Asegúrate de tener una ruta para esto
                break;
            case 'likes':
                navigate('/likes'); // Asegúrate de tener una ruta para esto
                break;
            case 'settings':
                navigate('/settings'); // Asegúrate de tener una ruta para esto
                break;
            case 'info':
                navigate('/info'); // Asegúrate de tener una ruta para esto
                break;
            default:
                navigate('/home');
                break;
        }
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