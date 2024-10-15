import React, { useEffect, useState } from 'react'
import { AsideRight } from '../complements/AsideRight.js'

export const Profile = () => {
  const [username, setUsername] = useState('')
  const [profileImg, setProfileImg] = useState('')
  const [desc, setDesc] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('http://localhost:4000/protected', {
          method: 'POST',
          credentials: 'include' // Esto permite incluir cookies en la solicitud
        })

        if (response.ok) {
          const data = await response.json()
          console.log('Datos del usuario:', data) // Log para verificar que los datos se reciben correctamente
          setUsername(data.user.username)
          setDate(data.user.join_date) // Asegúrate de usar "join_date" aquí
          setProfileImg(data.user.profile_img)
          setDesc(data.user.desc)
        } else {
          console.error('Error al obtener la información del usuario:', response.statusText)
        }
      } catch (error) {
        console.error('Error al hacer la solicitud:', error)
      }
    }

    fetchUserInfo()
  }, [])

  return (
    <div>
      <AsideRight />
      <div className='absolute left-[18%] w-[57.1%] h-[89.4vh] flex flex-col items-center pt-[5%]'>
        <div className='absolute bg-purple-500 h-[30%] w-full border-b-4 border-gray-300' /* Background pfp */ />
        <div className='absolute text-[30px] top-[41%] left-[23%]'>
          <h1>{username}</h1>
        </div>
        <div className='absolute text-[12px] top-[42%] left-[88.5%] text-center'>
          <h1>Usuario desde: {date || 'Fecha no disponible'}</h1>
        </div>

        {/* Mostrar la imagen de perfil */}
        <div className='absolute top-[28%] left-[2%]'>
          <img
            src={profileImg || 'http://localhost:4000/uploads/profiles/default.png'} // Muestra la imagen de perfil o la default
            alt="Profile"
            className="w-[20%] rounded-full border-4 border-gray-300"
          />
        </div>
        <div className='absolute top-[48%] left-[23%]'>
          <h1>Descripcion: <br/> { desc || 'Sin descripcion' } </h1>
        </div>
        <hr className='w-full absolute top-[65%] border-2 border-gray-300'/>
      </div>
    </div>
  )
}
