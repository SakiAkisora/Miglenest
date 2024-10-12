import React, { useState, useEffect } from 'react'
import { AsideRight } from '../complements/AsideRight'
import axios from 'axios'

export const Profile = () => {
  const [userName, setUsername] = useState('')
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token') // Obtén el token de autenticación del almacenamiento local
  console.log(token) // Check if the token is valid
  useEffect(() => {
    axios.get('http://localhost:4000/api/user', {
      headers: {
        Authorization: `Bearer ${token}` // Agrega el token de autenticación al encabezado
      }
    }).then(response => { setUsername(response.data.name);
      setLoading(false);
    })
    .catch(error => {
      console.error(error);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <AsideRight/>
      {loading ? (
        <h2 className='absolute text-xl top-[20%] left-[20%]'>Cargando...</h2>
      ) : (
        <h2 className='absolute text-xl top-[20%] left-[20%]'>Bienvenido, {userName}</h2>
      )}
    </div>
  )
}