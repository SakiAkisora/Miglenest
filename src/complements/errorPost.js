import React from 'react'
import errorIcon from '../assets/image/problem.png'
 
export const ErrorPost = () => {
    return (
        <div>
            <div className='absolute top-[10.6%] left-[18%] w-[57.1%] h-[89.4vh] flex flex-col items-center p-[5%]'>
                <img className='w-[125px]' src={errorIcon}></img>
                <p className='text-[25px] text-center'>Lo siento, no tenemos ninguna publicacion para mostrar ahora mismo debido a un error...</p>
            </div>
        </div>
    )
}
