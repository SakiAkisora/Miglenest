import React, { useState } from 'react';
import { AsideRight } from '../complements/AsideRight.js';
import { ErrorPost } from '../complements/errorPost.js';
import { PostVisualization } from '../complements/postVisualization.js';

export const Home = () => {
  const [error, setError] = useState(''); // Estado para almacenar errores
  const [hasPosts, setHasPosts] = useState(true); // Estado para manejar si hay posts

  return (
    <div className='HomePage'>
      <AsideRight />
      {error ? (
        <ErrorPost message={error} /> // Pasamos el mensaje de error
      ) : hasPosts ? (
        <PostVisualization setError={setError} setHasPosts={setHasPosts} /> // Pasamos funciones para manejar errores y existencia de posts
      ) : (
        <p>No hay posts disponibles.</p> // Mensaje si no hay posts
      )}
    </div>
  );
};

export default Home;
