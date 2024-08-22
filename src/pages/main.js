import React, { useState } from 'react';
import { HeaderMain } from '../complements/header';
import { AsideMenu } from '../complements/AsideMenu';
import { Home } from './home';
import { Routes } from 'react-router-dom';

function Main() {

  const [isMenuActive, setIsMenuActive] = useState(false);

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };
  return(
    <div>
      <HeaderMain isActive={isMenuActive} toggleMenu={toggleMenu} />
      <AsideMenu isMenuActive={!isMenuActive} />
      <Home></Home>
    </div>
  );
}

export default Main;