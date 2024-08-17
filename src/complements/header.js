import React, { useState } from 'react'
import logo from '../assets/image/Icon2.png'
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

                <button className="logoContainer">
                    <div id="logo">
                        <img src={logo} alt="Logo" />
                    </div>
                    <div id="miglenest">
                        iglenest
                    </div>
                </button>
                <div className='searchBar'>
                    <input placeholder='Buscar'></input>
                    <button id='lupa' type='submint'><img src={lupa}></img></button>
                </div>
                <div className='sesion'>
                    <div className='acceder'>
                        <button className='btnAcceder'>Acceder</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
