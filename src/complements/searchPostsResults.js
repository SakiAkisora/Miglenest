import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { format } from 'date-fns';

export const SearchPostsResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');
  const [userLikes, setUserLikes] = useState({});
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('q');  // Obtener el valor de 'q' desde la URL

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        if (searchQuery) {
          const response = await fetch('http://localhost:4000/search', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: searchQuery }) // Envía el query en el cuerpo
          });

          if (!response.ok) {
            setError('No se encontraron resultados');
            setSearchResults([]);
            console.log('Error en la respuesta del servidor', response.status);
          } else {
            const results = await response.json();
            setSearchResults(results);

            // Verificamos si el usuario ha dado like a los posts
            const likesStatus = {};
            for (const post of results) {
              const userLiked = await checkUserLikedPost(post.id_post);
              likesStatus[post.id_post] = userLiked;
            }
            setUserLikes(likesStatus); // Guardamos el estado de los likes para cada post
          }
        }
      } catch (error) {
        setError('Error al obtener los resultados de búsqueda');
        console.error('Error al buscar:', error);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  const checkUserLikedPost = async (postId) => {
    try {
      const response = await fetch('http://localhost:4000/userLikedPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId }), // Enviamos solo el postId
        credentials: 'include', // Importante para enviar la cookie de la sesión
      });

      const data = await response.json();
      return data.userLiked; // true o false dependiendo si el usuario dio like
    } catch (error) {
      console.error('Error al verificar el like:', error);
    }
  };

  const handleLikeClick = async (post) => {
    const postId = post.id_post;
    const alreadyLiked = userLikes[postId] || false;

    const updatedLikes = { ...userLikes, [postId]: !alreadyLiked };
    setUserLikes(updatedLikes);
    localStorage.setItem('userLikes', JSON.stringify(updatedLikes));

    setSearchResults((prevResults) =>
      prevResults.map((p) =>
        p.id_post === postId
          ? { ...p, likes: alreadyLiked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );

    try {
      const response = await fetch('http://localhost:4000/toggleLike', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId }),
        credentials: 'include', // Asegúrate de enviar cookies de sesión si es necesario
      });

      if (response.status === 401) {
        window.location.href = '/login'; // Redirige al login si no estás autenticado
        return;
      }

      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }

      const data = await response.json();
      setSearchResults((prevResults) =>
        prevResults.map((p) =>
          p.id_post === postId ? { ...p, likes: data.likes } : p
        )
      );
    } catch (error) {
      // Si ocurre un error, revertimos los likes en el frontend
      const revertedLikes = { ...userLikes, [post.id_post]: alreadyLiked };
      setUserLikes(revertedLikes);
      localStorage.setItem('userLikes', JSON.stringify(revertedLikes));
    }
  };

  const shareAcross = (post) => {
    const encodedId = btoa(post.id_post.toString());
    const shareData = {
      title: post.title,
      text: post.description,
      url: `http://localhost:3000/watch?p=${encodedId}`,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => console.log('Shared successfully'))
        .catch((error) => console.log('Share failed:', error));
    } else {
      console.log('Share not supported');
    }
  };

  return (
    <div className="absolute mt-[5.2%] ml-[18%] bg-white w-[57.1%] p-[1%]">
      {searchResults.length > 0 ? (
        searchResults.map((post) => (
          <div
            key={post.id_post}
            className="relative text-gray-500 bg-gray-300 h-[45vh] w-[100%] p-[1%] rounded-xl mb-[1%]"
          >
            <Link to={`/watch?p=${btoa(post.id_post.toString())}`} className="text-[25px]">
              {post.title}
            </Link>
            <p className="absolute top-2 right-4">{format(new Date(post.creation_date), 'MM/dd/yyyy')}</p>
            <p>{post.description}</p>

            <div className="absolute bottom-0 left-0 w-full text-[20px] flex">
              <button
                className={`border-2 border-r-0 border-black w-full rounded-bl-xl ${userLikes[post.id_post] ? 'text-white bg-purple-500' : ''}`}
                onClick={() => handleLikeClick(post)}
              >
                {post.likes} Likes
              </button>
              <button className="border-2 border-black w-full">Comentarios</button>
              <button
                className="border-2 border-l-0 border-black w-full rounded-br-xl"
                onClick={() => shareAcross(post)}
              >
                Compartir
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>{error || 'No se encontraron publicaciones'}</p>
      )}
    </div>
  );
};

export default SearchPostsResults;
