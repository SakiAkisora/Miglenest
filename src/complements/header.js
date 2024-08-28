import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/image/Icon2.png';
import lupa from '../assets/image/search.png';
import menu from '../assets/image/menu.png';
import { useNavigate } from 'react-router-dom';


export const HeaderMain = ({ isActive, toggleMenu }) => {
    const navigate = useNavigate();  

  const handleLoginClick = () => {
    navigate('/login'); // Navegar a la página de login sin animaciones
  };
    return (
        <div>
            <div className="fixed bg-[#6312aa] w-full flex items-center p-[0px_10px_10px_10px], top-0">
                <button className="relative w-[55px] h-[50px] transform ml-[10px] mr-[25px] mt-[-20px] cursor-pointer mb-[-20px] border-none" onClick={toggleMenu}>
                    <img className='invert' src={ menu }></img>
                </button>
 
                <Link to="/home">
                    <button className="flex items-center bg-[#6312aa] border-none cursor-pointer ml-[3%] mt-[-2%]">
                        <div id="logo">
                            <img className='w-[50px] mr-0' src={logo} alt="Logo" />
                        </div>
                        <div className='mt-[12px] text-[40px] text-white font-Clockwise font-semibold' id="miglenest">iglenest</div>
                    </button>
                </Link>

                <div className="mt-[10px] flex items-center relative bg-white rounded-xl mr-[13%] ml-[15%]">
                    <input className='flex-1 p-[5px] text-base border-[2px] border-gray-300 rounded-tl-lg rounded-bl-lg w-[500px] focus:outline-none' placeholder="Buscar"></input>
                    <button className='bg-white border-none p-[5px] rounded-tr-[10px] rounded-br-[10px] border-[2px] border-gray-300' id="lupa" type="submit">
                        <img className='w-[17px] h-[17px]' src={lupa} alt="Buscar" />
                    </button>
                </div>
                <div className="sesion">
                    <div className="mt-[10px] h-[30px] p-[2px_10px] text-[#6312aa] bg-white">
                            <button onClick={handleLoginClick} className="btnAcceder">Acceder</button>
                    </div>
                </div>
            </div>
        </div>
    );
};