import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/image/Icon2.png';
import lupa from '../assets/image/search.png';
import '../assets/styles/header.css';
import { useNavigate } from 'react-router-dom';


export const HeaderMain = ({ isActive, toggleMenu }) => {
    const navigate = useNavigate();  

  const handleLoginClick = () => {
    navigate('/login'); // Navegar a la página de login sin animaciones
  };

    return (
        <div>
            <div className="containerHeader">
                <button className="bars__menu" onClick={toggleMenu}>
                    <span className={`line1 ${isActive ? 'activeline1__bars-menu' : ''}`}></span>
                    <span className={`line2 ${isActive ? 'activeline2__bars-menu' : ''}`}></span>
                    <span className={`line3 ${isActive ? 'activeline3__bars-menu' : ''}`}></span>
                </button>
 
                <Link to="/Inicio">
                    <button className="logoContainer">
                        <div id="logo">
                            <img src={logo} alt="Logo" />
                        </div>
                        <div id="miglenest">iglenest</div>
                    </button>
                </Link>

                <div className="searchBar">
                    <input placeholder="Buscar"></input>
                    <button id="lupa" type="submit">
                        <img src={lupa} alt="Buscar" />
                    </button>
                </div>
                <div className="sesion">
                    <div className="acceder">
                            <button onClick={handleLoginClick} className="btnAcceder">Acceder</button>
                    </div>
                </div>
            </div>
        </div>
    );
};