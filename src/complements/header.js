import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/image/Icon2.png';
import lupa from '../assets/image/search.png';
import menu from '../assets/image/menu.png';
import profileIcon from '../assets/image/profileIcon.png';
import mic from '../assets/image/microphone.png';

export const HeaderMain = ({ isActive, toggleMenu }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();
  const menuRef = useRef(null);

  // Función para iniciar el reconocimiento de voz
  const startVoiceRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'es-ES'; // Configura el idioma al español
      recognition.continuous = true; // Mantiene el reconocimiento en curso

      // Evento cuando se detecta un resultado
      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setSearchQuery(transcript); // Asigna el texto reconocido al campo de búsqueda
      };

      // Evento de error
      recognition.onerror = (event) => {
        console.error('Error en el reconocimiento de voz:', event.error);
      };

      // Inicia el reconocimiento
      recognition.start();
    } else {
      alert('El reconocimiento de voz no es compatible con este navegador.');
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleCreateContent = () => {
    navigate('/create');
  };

  const handleSearch = async (searchQuery) => {
    if (!searchQuery) {
      console.error('La consulta de búsqueda está vacía');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchQuery }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error al buscar:', errorText);
        setSearchResults([]);
        return;
      }

      const results = await response.json();
      console.log('Resultados de búsqueda recibidos:', results);
      setSearchResults(results);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    } catch (error) {
      console.error('Error al buscar:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:4000/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        localStorage.removeItem('userLikes');
        navigate('/login');
      } else {
        console.error('Error al cerrar sesión');
      }
    } catch (error) {
      console.error('Error al hacer logout:', error);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:4000/protected', {
          method: 'POST',
          credentials: 'include',
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  const handleProfileClick = () => {
    setIsMenuActive(!isMenuActive);
  };

  return (
    <div>
      <div className="fixed bg-[#6312aa] w-full flex items-center p-[0px_10px_10px_10px], top-0 z-50">
        <button className="relative w-[55px] h-[50px] transform ml-[10px] mr-[25px] mt-[-20px] cursor-pointer mb-[-20px] border-none" onClick={toggleMenu}>
          <img className="invert" src={menu} alt="active/desactive asidemenu" />
        </button>

        <Link to="/home">
          <button className="flex items-center bg-[#6312aa] border-none cursor-pointer ml-[3%] mt-[-2%]">
            <div id="logo">
              <img className="w-[50px] mr-0" src={logo} alt="Logo" />
            </div>
            <div className="mt-[12px] text-[40px] text-white font-Clockwise font-semibold" id="miglenest">iglenest</div>
          </button>
        </Link>

        <div className="mt-[10px] flex items-center relative bg-white rounded-xl mr-[13%] ml-[11.5%]">
          <input
            className="flex-1 p-[5px] text-base border-[2px] border-gray-300 rounded-tl-lg rounded-bl-lg w-[500px] focus:outline-none"
            placeholder="Buscar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="bg-white border-none p-[5px] rounded-tr-[10px] rounded-br-[10px] border-[2px] border-gray-300"
            id="lupa"
            type="submit"
            onClick={() => {
              handleSearch(searchQuery);
            }}
          >
            <img className="w-[17px] h-[17px]" src={lupa} alt="Buscar" />
          </button>
        </div>

        <button onClick={startVoiceRecognition} className="bg-white rounded-full w-[40px] mt-[0.8%] ml-[-12.5%] p-[0.3%] mr-[13%]">
          <img src={mic} alt="STT" />
        </button>

        <div className="sesion">
          <div className="mt-[10px] h-[30px] p-[2px_10px] text-[#6312aa]">
            <div>
              {isAuthenticated ? (
                <div className="absolute z-10">
                  <button onClick={handleCreateContent} className="ml-[-70px] mr-[30px] mt-[-4px] h-[35px] p-[2px_10px] text-[#6312aa] bg-white">Crear</button>
                  <button onClick={handleProfileClick} className="mt-[-35px] h-[30px] p-[2px_10px]">
                    <img className="invert w-[45px] h-[45px]" src={profileIcon} alt="Perfil" />
                  </button>
                  {isMenuActive && (
                    <div ref={menuRef} className="absolute text-black bg-gray-300 mt-[10px] ml-[-140px] text-xl rounded-lg">
                      <button onClick={() => navigate('/profile')} className="text-left p-[10px] pb-3 hover:bg-white rounded-lg w-full">Perfil</button>
                      <button onClick={handleLogout} className="p-[10px] hover:bg-white rounded-lg">Cerrar sesión</button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-[-2px] h-[30px] p-[2px_10px] text-[#6312aa] bg-white">
                  <button onClick={handleLoginClick} className="btnAcceder">Acceder</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
