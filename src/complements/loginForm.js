import React, { useState } from 'react'
import logo2 from '../assets/image/LetraBlanca.png'
import videoMuestra from '../assets/image/VideoMuestra.mp4'
import { useNavigate } from 'react-router-dom'

export const LoginForm = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isVisible, setIsVisible] = useState(true)
  const [isVisibleLogin, setIsVisibleLogin] = useState(false)
  const [isVisibleRegister, setIsVisibleRegister] = useState(false)

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  const toggleLogin = () => {
    setIsVisibleLogin(!isVisibleLogin)
  }
  const toggleRegister = () => {
    setIsVisibleRegister(!isVisibleRegister)
  }

  const handleRegister = async () => {
    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password
      })
    })

    const data = await response.json()
    console.log(data)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include', // Incluye las credenciales
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      navigate('/home')
    } else {
      console.error('Error al iniciar sesión:', data.error)
    }
  }
  const handleGitHubLogin = async () => {
    window.location.href = "http://localhost:4000/auth/github"; // Redirigir al flujo de autenticación de GitHub
  };
  // Manejo de cambios de entrad
  return (
    <div>
      <div className='main__background'>
        <div className='video__container'>
          <video src={videoMuestra} autoPlay loop></video>
          <div className='main__panel'>
            <div className='main__logo'>
              <img src={logo2} alt='Logo of miglenest transparent'></img>
              <span id='name__logo'>Miglenest</span>
              <span id='description'>En Miglenest, aprende, crea y disfruta mientras exploras nuevas ideas. Únete a una comunidad apasionada por el conocimiento y la creatividad, y encuentra inspiración para aprender algo nuevo cada día.</span>
            </div>
          </div>
        </div>
        <div className={`select__account__options ${isVisible ? 'visible' : 'hidden'}`}>
          <span id='starting'>Empecemos por lo basico...</span>
          <span id='question'>¿Ya tienes cuenta?</span>
          <button onClick={() => { toggleVisibility(); toggleLogin() }} className='btnLogin'>Iniciar sesión</button>
          <span id='question'>Crear una cuenta</span>
          <button onClick={() => { toggleVisibility(); toggleRegister() }} className='btnRegister'>Registrarme</button>
          <div className='options__account'>
            <span><a href='/home'>Volver a inicio</a></span>
          </div>
        </div>
        <div className={`container__login ${isVisibleLogin ? 'visible' : 'hidden'}`}>
          <div className='background__color'>
            <div className='square__login'>
              <div className='miglenest__mini-logo'>
                <button onClick={() => { toggleVisibility(); toggleLogin() }} className='back'>
                  <span id='line1'></span>
                  <span id='line2'></span>
                </button>
              </div>

              <form className='login__form' onSubmit={ handleLogin }>
                <p id='action'>Inicio de Sesión</p>
                <input
                  type="email"
                  placeholder="email"
                  value={ email }
                  onChange={(e) => setEmail(e.target.value)} // Actualiza el estado
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={ password }
                  onChange={(e) => setPassword(e.target.value)} // Actualiza el estado
                  required
                />
                <button type="submit">Iniciar Sesión</button>
              </form>
              <div>
                <button onClick={handleGitHubLogin} className="btnGitHub">
                  Iniciar con GitHub
                </button>
              </div>
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
                <button onClick={() => { toggleVisibility(); toggleRegister() }} className='back2'>
                  <span id='line1'></span>
                  <span id='line2'></span>
                </button>
              </div>
              <form className='signup__form' onSubmit={ handleRegister }>
                <p id='action'>Inicio de Sesión</p>
                <input
                  id = "username"
                  className='username'
                  placeholder='Escriba un usuario'
                  value={ username }
                  onChange={(e) => setUsername(e.target.value)} // Actualiza el estado
                  required
                />
                <input
                  id = "email"
                  className='email'
                  placeholder='Escriba su correo'
                  type='email'
                  value={ email }
                  onChange={(e) => setEmail(e.target.value)} // Actualiza el estado
                  required
                />
                <input
                  id = 'password'
                  type='password'
                  placeholder='Escriba su contraseña'
                  className='password'
                  value={ password }
                  onChange={(e) => setPassword(e.target.value)} // Actualiza el estado
                  required
                />
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
