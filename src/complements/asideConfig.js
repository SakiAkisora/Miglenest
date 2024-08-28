import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

export const AsideConfig = () => {
  const navigate = useNavigate();

  const HandleNavigate = (path) => {
    navigate(path);
  }
  
  return (
    <div>
        <div className='fixed top-[12.2%] h-[87.8vh] left-[5%] w-1/4 z-0 flex flex-col border-r-2 border-gray-300'>
            <h2 className='p-2 text-2xl border-b-2 border-gray-300'><b>Configuracion</b></h2>
            <div className='config__buttons'>
                <button className='w-full text-left p-2.5 text-lg border-b-2 border-gray-300' id='account' onClick={() => HandleNavigate('settings/account')}>Cuenta</button>
                <button className='w-full text-left p-2.5 text-lg border-b-2 border-gray-300' id='notifications' onClick={() => HandleNavigate('settings/notifications')}>Notificaciones</button>
                <button className='w-full text-left p-2.5 text-lg border-b-2 border-gray-300' id='language'>Idioma</button>
                <button className='w-full text-left p-2.5 text-lg border-b-2 border-gray-300' id='privacy'>Privacidad</button>
                <button className='w-full text-left p-2.5 text-lg border-b-2 border-gray-300' id='advanced__config'>Configuracion avanzada</button>
            </div>
        </div>
    </div>
  )
}
export default AsideConfig;
