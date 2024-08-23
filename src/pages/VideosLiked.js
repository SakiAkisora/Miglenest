import React from 'react'
import '../assets/styles/liked-saved.css'

export const VideosLiked = () => {
  return (
    <div>
        <div className='container__videos'>
            <h2>Videos que te gustaron</h2>
            <div className='no-videos'>
                <p>Parece que no le has dado "me gusta" a ningún video, ¿Qué te parece si buscamos un video que te guste?</p>
                <a href='/home'>Llevame a mi feed</a>
            </div>
        </div>
    </div>
  )
}
export default VideosLiked;
