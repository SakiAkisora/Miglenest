import React from 'react'

export const LanguageSettings = () => {
    return (
        <div className='absolute bg-white w-[70%] h-[89.4vh] ml-[30%] top-[10.6%]'>
            <h2 className='text-2xl font-semibold border-b-2 p-1'>Cambiar el idioma de la aplicacion</h2>
            <div className='flex flex-col items-start text-xl'>
                <button className=' p-[10px] border-b-2 w-full text-start'>Español - Spanish</button>
                <button className=' p-[10px] border-b-2 w-full text-start'>English - Inglés</button>
            </div>
        </div>
    )
}
export default LanguageSettings;
