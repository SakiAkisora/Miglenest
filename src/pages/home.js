import React, { useState } from 'react';
import { HeaderMain } from '../complements/header';
import { AsideMenu } from '../complements/AsideMenu';

function Home() {
  const [isMenuActive, setIsMenuActive] = useState(false);

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };
  return(
    <div>
      <HeaderMain isActive={isMenuActive} toggleMenu={toggleMenu} />
      <AsideMenu isMenuActive={!isMenuActive} />
    </div>
  );
}

export default Home;