import React from 'react'
import { useNavigate } from 'react-router-dom';

export const AsideInfo = () => {
    const navigate = useNavigate();

  const HandleNavigate = (path) => {
    navigate(path);
  }
  
  return (
    <div>
        <div className='fixed top-[10.6%] h-[87.8vh] left-[5%] w-1/4 z-0 flex flex-col border-r-2 border-gray-300'>
            <h2 className='p-2 text-2xl border-b-2 border-gray-300'><b>Información</b></h2>
            <div className='config__buttons'>
                <button className='w-full text-left p-2.5 text-lg border-b-2 border-gray-300' id='account' onClick={() => HandleNavigate('about-us')}>Sobre nosotros</button>
                <button className='w-full text-left p-2.5 text-lg border-b-2 border-gray-300' id='notifications' onClick={() => HandleNavigate('privacy-policy')}>Política de privacidad</button>
                <button className='w-full text-left p-2.5 text-lg border-b-2 border-gray-300' id='language' onClick={() => HandleNavigate('terms-of-service')}>Condiciones del servicio</button>
                <button className='w-full text-left p-2.5 text-lg border-b-2 border-gray-300' id='privacy' onClick={() => HandleNavigate('community-guidelines')}>Normas de comunidad</button>
            </div>
        </div>
    </div>
  )
}
