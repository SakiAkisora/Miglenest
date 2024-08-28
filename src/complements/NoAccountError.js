import React from 'react'
import errorNoAccountIcon from '../assets/image/errorPerson.png'
export const NoAccountError = () => {
  return (
    <div>
        <div className='absolute top-[20.5%] left-[30%] p-[30%] flex justify-center items-center text-center flex-col'>
            <img src={errorNoAccountIcon}></img>
            <h2 className='mb-[3%]'>Vaya parece que no tienes una cuenta, ¿Por qué no intentas iniciar sesión o crear una cuenta?</h2>
            <a href='/login'><button className='bg-[#6312aa] color-white p-[10px] text-[20px] rounded-[20px] border-none cursor-pointer transition-all-300'>Quiero tener una cuenta</button></a>
            <a href ='/home'><button >No me interesa por el momento</button></a>
        </div> 
    </div>
  )
}
