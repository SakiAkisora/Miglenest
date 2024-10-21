import React, { useState, useEffect } from 'react';
import { AsideRight } from '../complements/AsideRight.js';
import { useNavigate } from 'react-router-dom';

export const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [id_category, setIdCategory] = useState(null);
  const [file, setFile] = useState(null);
  const [typefile, setTypefile] = useState('');
  const [id_user, setIdUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch('http://localhost:4000/getUserId', {
          method: 'POST',
          credentials: 'include' // Incluye las cookies en la solicitud
        });
        
        console.log('Respuesta del servidor:', response); // Agregar log aquí
  
        if (response.ok) {
          const data = await response.json();
          console.log('ID del usuario obtenido:', data.id_user); // Verifica el ID obtenido
          setIdUser(data.id_user);  // Guardamos el ID del usuario
        } else {
          console.error('Error al obtener el ID del usuario:', response.statusText);
        }
      } catch (error) {
        console.error('Error en la solicitud para obtener el ID del usuario:', error);
      }
    };
  
    fetchUserId();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setTypefile(selectedFile?.type || '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar el comportamiento predeterminado del formulario
    setLoading(true); // Cambia el estado de carga
  
    try {
      const response = await fetch('http://localhost:4000/createPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          description: description,
          id_category: id_category,
          id_user: id_user, // Asegúrate de que esto tenga un valor
          file: file,
          typefile: typefile
        })
      });
  
      const data = await response.json();
      console.log(data);
      // Puedes hacer algo con la respuesta aquí, como redirigir al usuario
    } catch (error) {
      console.error('Error al crear la publicación:', error);
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  };

  return (
    <div>
      <AsideRight />
      <div className='absolute mt-[5.6%] ml-[18.5%] bg-gray-300 h-[87%] w-[56%] p-[1%] rounded-xl'>
        <form onSubmit={handleSubmit}>
          <input 
            className='w-full h-[50px] text-xl mb-[2%] p-[1%]' 
            placeholder='Título de la publicación'
            value={title}
            onChange={(e) => setTitle(e.target.value)} 
          />
          <textarea 
            className='w-full h-[80px] text-l p-[1%]' 
            placeholder='Descripción'
            value={description}
            onChange={(e) => setDescription(e.target.value)} 
          />
          <input 
            className='w-full h-[50px] text-xl mb-[2%]' 
            type='file' 
            placeholder='Subir archivo'
            onChange={handleFileChange}
          />
          <input 
            className='mt-[37%] h-[45px] w-[40%] p-[1%]' 
            placeholder='Elegir categoría'
            value={id_category}
            onChange={(e) => setIdCategory(e.target.value)} 
          />
          <div className="flex justify-between mt-[5%]">
            <button 
              type="button" 
              className='bg-white text-[22px] p-[1%] rounded-xl' 
              onClick={() => navigate('/')}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className='bg-purple-500 text-white text-[22px] p-[1%] rounded-xl'
              disabled={loading}
            >
              {loading ? 'Subiendo...' : 'Subir'}
            </button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
};
