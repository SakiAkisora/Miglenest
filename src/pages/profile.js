import React, { useEffect, useState } from 'react'
import { AsideRight } from '../complements/AsideRight.js'

export const Profile = () => {
  const [username, setUsername] = useState('')
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
      <div className='absolute text-xl top-[20%] left-[20%]'>
        <h1>Bienvenido, { username }</h1>
        <h1>Fecha de unión: {date || 'Fecha no disponible'}</h1>
      </div>
    </div>
  )
}
