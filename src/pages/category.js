import React, { useEffect, useState} from 'react';
import lupa from '../assets/image/search.png';
import { useNavigate } from 'react-router-dom';

export const Category = () => {
  const [categories, setCategories] = useState([]); // Cambiado a []
  const [filteredCategories, setFilteredCategories] = useState([]); // Para filtrar las categorías
  const [searchTerm, setSearchTerm] = useState(''); // Para manejar el término de búsqueda
  const [error, setError] = useState(null);
  const [filterQuery, setFilterQuery] = useState()

  const navigate = useNavigate()

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch('http://localhost:4000/categoryList', {
          method: 'GET', // Cambiado a GET
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) throw new Error('Error al obtener categorías');
        const data = await response.json();

        if (data.length === 0) {
          setCategories([]); // Sin categorías
          setFilteredCategories([]);
        } else {
          setCategories(data); // Guarda las categorías obtenidas
          setFilteredCategories(data); // Inicializa la lista filtrada
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetchCategory();
  }, []);

  useEffect(() => {
    // Filtra las categorías por el término de búsqueda
    setFilteredCategories(
      categories.filter(category =>
        category.category_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, categories]);

  const handleFilterCategory = async (id_category, category_name) => {
    if (!id_category) {
      console.error('Filter query is empty');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:4000/filterByCategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_category }), // Envía id_category
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error al filtrar: ', errorText);
        setFilteredCategories([]); // Vacía la lista si falla
        return;
      }
  
      const result = await response.json();
      setFilteredCategories(result);
      navigate(`/filtered?category_id=${id_category}`); // Navega con id_category en la URL
    } catch (error) {
      console.error('Error al filtrar: ', error);
    }
  };

  return (
    <div>
      <div className='absolute top-[10.6%] left-[18%] w-[81%] h-[89.4vh] p-[1%]'>
        <h2 className='text-[40px] text-[#6312aa] font-semibold mb-[1%]'>Categorias</h2>

        {/* Input de búsqueda */}
        <div className='mt-10px flex justify-center relative bg-white rounded-[10px] mb-[3%]'>
          <input 
            type='text' 
            className='flex-1 p-[5px] text-base border-[2px] border-gray-300 rounded-tl-[10px] rounded-bl-[10px] focus:outline-none' 
            placeholder='Buscar una categoria' 
            value={searchTerm} // Vínculo con el valor del estado
            onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el valor del término de búsqueda
          />
          <button className='bg-white border-[2px] border-gray-300 border-l-0 cursor-pointer p-[5px] rounded-tr-[10px] rounded-br-[10px]' id="search__icon" type="submit">
            <img className='w-[20px] h-[20px]' src={lupa} alt="Search between categories" />
          </button>
        </div>

        {error && <p className='text-red-500'>{error}</p>}

        <div className='group__categories'>
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <button 
                  key={category.id_category} 
                  onClick={() => handleFilterCategory(category.id_category, category.category_name) }
                  className='add_category w-[24%] text-[20px] p-[5px] bg-[#6312aa] text-white border-none hover:text-[25px] transition-all duration-300 mt-[-1%] ml-[0.5%] mr-[0.5%] mb-[2%]'>
                #{category.category_name}
              </button>
            ))
          ) : (
            <p>No hay categorías disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
