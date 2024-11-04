import React from 'react'

export const AsideRight = () => {
  return (
    <div>
        <div className='fixed top-[10.6%] right-0 border-[2px] border-gray-300 h-[89.4vh] w-1/4 p-[1%]'>
            <div className='border-[2px] border-gray-300 p-[0%_5%_5%_5%] mb-[5%]'>
                <div className='accounts__followed'>
                    <h2 className='text-[20px] text-[#6312aa] mb-[2%] font-bold'>Cuentas a las que sigues</h2>
                    <p>Inicia sesión para poder ver las cuentas que sigues</p>
                </div>
            </div>
            <div className='border-[2px] border-gray-300 p-[0%_5%_5%_5%] mb-[5%]'>
                <div className='topics'>
                    <h2 className='text-[20px] text-[#6312aa] mb-[2%] font-bold'>Mira lo que es tendencia hoy</h2>
                    <p>No tenemos videos con suficientes "Me gusta" para mostrarlos en tendencias...</p>
                </div>
            </div>
            <div className='border-[2px] border-gray-300 p-[0%_5%_5%_5%] mb-[5%]'>
                <div className='topics'>
                    <h2 className='text-[20px] text-[#6312aa] mb-[2%] font-bold'>¿Sin ideas? Mira nuestras recomendaciones</h2>
                    <p>Vaya... parece que hubo un error y no tenemos videos para recomendarte...</p>
                </div>
            </div>
        </div>
    </div>
  )
}
