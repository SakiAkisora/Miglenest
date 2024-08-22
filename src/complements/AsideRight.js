import React from 'react'
import '../assets/styles/asideRight.css'

export const AsideRight = () => {
  return (
    <div>
        <div className='aside__container'>
            <div className='container__accounts'>
                <div className='accounts__followed'>
                    <h2>Cuentas a las que sigues</h2>
                    <p>Inicia sesión para poder ver las cuentas que sigues</p>
                </div>
            </div>
            <div className='container__topics'>
                <div className='topics'>
                    <h2>Mira lo que es tendencia hoy</h2>
                    <p>No tenemos videos con suficientes "Me gusta" para mostrarlos en tendencias...</p>
                </div>
            </div>
            <div className='container__ideas'>
                <div className='topics'>
                    <h2>¿Sin ideas? Mira nuestras recomendaciones</h2>
                    <p>Vaya... parece que hubo un error y no tenemos videos para recomendarte...</p>
                </div>
            </div>
        </div>
    </div>
  )
}
