import React from 'react'
import lupa from '../assets/image/search.png';

export const Category = () => {
  return (
    <div>
      <div className='absolute top-[10.6%] left-[18%] w-[82%] h-[89.4vh] p-[1%]'>
        <h2 className='text-[40px] text-[#6312aa] font-semibold mb-[1%]'>Categorias</h2>
        <div className='mt-10px flex justify-center relative bg-white rounded-[10px] mb-[3%]'>

          <input type='text' className='flex-1 p-[5px] text-base border-[2px] border-gray-300 rounded-tl-[10px] rounded-bl-[10px] focus:outline-none' placeholder='Buscar una categoria'></input>
          <button className='bg-white border-[2px] border-gray-300 border-l-0 cursor-pointer p-[5px] rounded-tr-[10px] rounded-br-[10px]' id="search__icon" type="submit">
            <img className='w-[20px] h-[20px]' src={lupa} alt="Search btw categories" />
          </button>
        </div>
        <div className='group__categories'>
          <button className='add_category w-1/5 text-[20px] p-[5px] bg-[#6312aa] text-white border-none hover:text-[25px] transition-all duration-300 mt-[-1%]'>+</button>
        </div>
      </div>
    </div>
  )
}
export default Category;  