import React, { useState } from 'react'
import logo from '../assets/image/Iconblanco.png';
import logo2 from '../assets/image/LetraBlanca.png';
import videoMuestra from '../assets/image/VideoMuestra.mp4'

export const LoginForm = () => {

  const [isVisible, setIsVisible] = useState(true);
  const [isVisibleLogin, setIsVisibleLogin] = useState(false);
  const [isVisibleRegister, setIsVisibleRegister] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const toggleLogin = () => {
    setIsVisibleLogin(!isVisibleLogin);
  };
  const toggleRegister = () => {
    setIsVisibleRegister(!isVisibleRegister);
  };

  return (
    <div>
      <div className='main__background'>
        <div className='video__container'>
          <video src={videoMuestra} autoPlay loop></video>
          <div className='main__panel'>
            <div className='main__logo'>
              <img src={logo2}></img>
              <span id='name__logo'>Miglenest</span>
              <span id='description'>En Miglenest, aprende, crea y disfruta mientras exploras nuevas ideas. Únete a una comunidad apasionada por el conocimiento y la creatividad, y encuentra inspiración para aprender algo nuevo cada día.</span>
            </div>
          </div>
        </div>
        <div className={`select__account__options ${isVisible ? 'visible' : 'hidden'}`}>
          <span id='starting'>Empecemos por lo basico...</span>
          <span id='question'>¿Ya tienes cuenta?</span>
          <button onClick={() => { toggleVisibility(); toggleLogin(); }} className='btnLogin'>Iniciar sesión</button>
          <span id='question'>Crear una cuenta</span>
          <button onClick={() => { toggleVisibility(); toggleRegister(); }} className='btnRegister'>Registrarme</button>
          <div className='options__account'>
                <span><a href='/home'>Volver a inicio</a></span>
              </div>
        </div>
        <div className={`container__login ${isVisibleLogin ? 'visible' : 'hidden'}`}>
          <div className='background__color'>
            <div className='square__login'>
              <div className='miglenest__mini-logo'>
                <button onClick={() => { toggleVisibility(); toggleLogin(); }} className='back'>
                  <span id='line1'></span>
                  <span id='line2'></span>
                </button>
              </div>
              <form className='login__form'>
                <p id='action'>Inicio de Sesión</p>
                <input className='username' placeholder='Escriba su correo o usuario'></input>
                <input type='password' placeholder='Escriba su contraseña' className='password'></input>
                <button className='btn'>Iniciar sesión</button>
              </form>
              <div className='options__account'>
                <span><a href='#'>¿Olvidaste tu contraseña?</a></span>
                <span><a href='/home'>Volver a inicio</a></span>
              </div>
            </div>
          </div>
        </div>
        <div className={`container__signup ${isVisibleRegister ? 'visible' : 'hidden'}`}>
          <div className='background__color'>
            <div className='square__login'>
              <div className='miglenest__mini-logo'>
                <button onClick={() => { toggleVisibility(); toggleRegister(); }} className='back2'>
                  <span id='line1'></span>
                  <span id='line2'></span>
                </button>
              </div>
              <form className='signup__form'>
                <p id='action'>Inicio de Sesión</p>
                <input className='name' placeholder='Escriba su nombre'></input>
                <input className='username' placeholder='Escriba un usuario'></input>
                <input className='email' placeholder='Escriba su correo' type='mail'></input>
                <input type='password' placeholder='Escriba su contraseña' className='password'></input>
                <input type='password' placeholder='Confirme su contraseña' className='password__confirm'></input>
                <button className='btn'>Registrarme</button>
              </form>
              <div className='options__account'>
                <span><a href='#'>¿Olvidaste tu contraseña?</a></span>
                <span><a href='/home'>Volver a inicio</a></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
