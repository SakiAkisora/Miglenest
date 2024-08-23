import React from 'react'
import lupa from '../assets/image/search.png';
import '../assets/styles/category.css';

export const Category = () => {
  return (
    <div>
      <div className='container__category'>
        <h2>Categorias</h2>
        <div className='container__search-category'>

        <input type='text' className='search__category' placeholder='Buscar una categoria'></input>
        <button id="search__icon" type="submit">
                        <img src={lupa} alt="Search btw categories" />
                    </button>
        </div>
        <div className='group__categories'>
          <button className='add_category'>+</button>
        </div>
      </div>
    </div>
  )
}
export default Category;  