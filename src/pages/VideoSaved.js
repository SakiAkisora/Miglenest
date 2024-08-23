import React from 'react'

export const VideoSaved = () => {
  return (
    <div>
        <div className='container__videos'>
            <h2>Tus videos guardados</h2>

            <div className='no-videos'>
                <p>Parece que no tienes videos guardados, ¿Qué te parece si agregamos algunos?</p>
                <a href='/home'>Llevame a mi feed</a>
            </div>
        </div>
    </div>
  )
}
export default VideoSaved;