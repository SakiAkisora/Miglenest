import React from 'react'

export const VideoSaved = () => {
  return (
    <div>
        <div className='mt-[6%] ml-[19%]'>
            <h2 className='text-[40px] text-[#6312aa] mb-[2%]'>Tus videos guardados</h2>

            <div className='mt-[15%] text-center text-[20px]'>
                <p>Parece que no tienes videos guardados, ¿Qué te parece si agregamos algunos?</p>
                <a className='text-[#6312aa] no-underline' href='/home'>Llevame a mi feed</a>
            </div>
        </div>
    </div>
  )
}
export default VideoSaved;