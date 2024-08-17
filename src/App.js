import React, { useState } from 'react';
import './App.css';
import { HeaderMain } from './complements/header';
import { AsideMenu } from './complements/AsideMenu';

function App() {
  const [isMenuActive, setIsMenuActive] = useState(false);

    const toggleMenu = () => {
        setIsMenuActive(!isMenuActive);
    }
  return (
    <div className="App">
        <HeaderMain isActive={isMenuActive} toggleMenu={toggleMenu} />
        <AsideMenu isMenuActive={isMenuActive} />
        
    </div>
  );
}

export default App;
