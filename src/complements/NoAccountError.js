import React from 'react'
import errorNoAccountIcon from '../assets/image/errorPerson.png'
export const NoAccountError = () => {
  return (
    <div>
        <div className='absolute top-[30%] left-[25%] w-[75%] p-[0px_4%_5%_8%] flex justify-center items-center text-center flex-col'>
            <img src={errorNoAccountIcon}></img>
            <h2 className='mb-[3%] text-2xl'>Vaya parece que no tienes una cuenta, ¿Por qué no intentas iniciar sesión o crear una cuenta?</h2>
            <a href='/login'><button className='mb-[10%] bg-[#6312aa] color-white p-[10px] text-white text-[20px] rounded-[20px] border-none cursor-pointer transition-all-300'>Quiero tener una cuenta</button></a>
            <a href ='/home'><button className='bg-[#6312aa] color-white p-[10px] text-white text-[20px] rounded-[20px] border-none cursor-pointer transition-all-300'>No me interesa por el momento</button></a>
        </div>
    </div>
  )
}
export default NoAccountError
