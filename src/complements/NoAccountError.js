import React from 'react'
import errorNoAccountIcon from '../assets/image/errorPerson.png'
export const NoAccountError = () => {
  return (
    <div>
        <div className='container__errorNoAccount'>
            <img src={errorNoAccountIcon}></img>
            <h2>Vaya parece que no tienes una cuenta, ¿Por qué no intentas iniciar sesión o crear una cuenta?</h2>
            <a href='/login'><button id='buttonIdError'>Quiero tener una cuenta</button></a>
            <a href ='/home'><button id='buttonIdError' >No me interesa por el momento</button></a>
        </div>
    </div>
  )
}
