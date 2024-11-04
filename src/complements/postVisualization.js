import React, { useEffect, useState } from 'react';
import { format, formatDistanceToNow } from 'date-fns';

export const PostVisualization = ({ setError, setHasPosts }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:4000/getPosts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ limit: 0 }),
        });

        if (!response.ok) {
          throw new Error('Error al obtener los posts');
        }

        const data = await response.json();

        if (data.length === 0) {
          setHasPosts(false); // No hay posts
        } else {
          const processedData = data.map((post) => {
            const creationDate = new Date(post.creation_date);
          
            // Verificar que la fecha se haya creado correctamente
            if (isNaN(creationDate.getTime())) {
              console.error(`Error al crear la fecha para ${post.title}:`, post.creation_date);
              return { ...post, creation_date: new Date() }; // Devolver la fecha actual en caso de error
            }
          
            // Formatear la fecha solo si se necesita como string para mostrar
            const formattedCreationDate = format(creationDate, 'dd/MM/yyyy');
          
            return {
              ...post,
              creation_date: creationDate, // Mantener la fecha como objeto Date
              formatted_creation_date: formattedCreationDate, // Nueva propiedad para mostrar
            };
          });
          

          setPosts(processedData);
          setHasPosts(true); // Hay posts
        }
      } catch (error) {
        setError(error.message);
        setHasPosts(false); // Hay un error, por lo que no hay posts
      }
    };

    fetchPosts();
  }, [setError, setHasPosts]);

  return (
    <div className='absolute mt-[5.2%] ml-[18%] bg-white w-[57.1%] p-[1%]'>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post.title}
            className='text-gray-500 bg-gray-300 h-[45vh] w-[100%] p-[1%] rounded-xl mb-[1%]'
          >
            <h1>{post.title}</h1>
            <p>
              {/* Mostrar la fecha en formato DD/MM/YYYY */}
              {format(post.creation_date, 'MM/dd/yyyy')}
            </p>
            <p>{post.description}</p>
          </div>
        ))
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};
