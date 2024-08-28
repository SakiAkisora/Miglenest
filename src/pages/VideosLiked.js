import React from 'react'

export const VideosLiked = () => {
  return (
    <div>
        <div className='mt-[6%] ml-[19%]'>
            <h2 className='text-[40px] text-[#6312aa] mb-[2%]'>Videos que te gustaron</h2>
            <div className='mt-[15%] text-center text-[20px]'>
                <p>Parece que no le has dado "me gusta" a ningún video, ¿Qué te parece si buscamos un video que te guste?</p>
                <a className='text-[#6312aa] no-underline' href='/home'>Llevame a mi feed</a>
            </div>
        </div>
    </div>
  )
}
export default VideosLiked;
