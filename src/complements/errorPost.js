import React from 'react'
import errorIcon from '../assets/image/problem.png'
import '../assets/styles/errorPost.css'

export const ErrorPost = () => {
    return (
        <div>
            <div className='errorPost'>
                <img src={errorIcon}></img>
                <p>Lo siento, no tenemos ninguna publicacion para mostrar ahora mismo debido a un error...</p>
            </div>
        </div>
    )
}
