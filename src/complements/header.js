import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/image/Icon2.png';
import lupa from '../assets/image/buscar.png';
import '../assets/styles/header.css';

export const HeaderMain = ({ isActive, toggleMenu }) => {
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
                        <Link to="/Login">
                            <button className="btnAcceder">Acceder</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};