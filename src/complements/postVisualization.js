import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';

export const PostVisualization = ({ setError, setHasPosts }) => {
  const [posts, setPosts] = useState([]);
  const [userLikes, setUserLikes] = useState({}); // Estado para almacenar los likes del usuario

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

        if (!response.ok) throw new Error('Error al obtener los posts');

        const data = await response.json();
        if (data.length === 0) {
          setHasPosts(false);
        } else {
          const processedData = data.map((post) => {
            const creationDate = new Date(post.creation_date);
            const formattedCreationDate = isNaN(creationDate.getTime())
              ? new Date()
              : creationDate;

            // Inicializar el estado de likes del usuario para este post
            const userLiked = userLikes[post.id_post] || false;

            return {
              ...post,
              creation_date: formattedCreationDate,
              formatted_creation_date: format(formattedCreationDate, 'dd/MM/yyyy'),
              likes: post.likes || 0, // Añade likes
              userLiked, // Almacena si el usuario ha dado like
            };
          });

          setPosts(processedData);
          setHasPosts(true);
        }
      } catch (error) {
        setError(error.message);
        setHasPosts(false);
      }
    };

    fetchPosts();
  }, [setError, setHasPosts, userLikes]); // Asegúrate de incluir userLikes en las dependencias

  const handleLikeClick = async (post) => {
    const postId = post.id_post;
    const alreadyLiked = userLikes[postId] || false; // Verifica si ya ha dado like

    // Actualiza el estado localmente
    setPosts((prevPosts) =>
      prevPosts.map((p) =>
        p.id_post === postId 
          ? { ...p, likes: alreadyLiked ? p.likes - 1 : p.likes + 1 } 
          : p
      )
    );

    // Almacena el nuevo estado de like
    setUserLikes((prevLikes) => ({ ...prevLikes, [postId]: !alreadyLiked }));

    try {
      const response = await fetch('http://localhost:4000/toggleLike', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId }),
        credentials: 'include', // Para enviar la cookie de sesión
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }

      const data = await response.json();
      console.log('Likes actualizados desde el servidor:', data.likes);

      // Si es necesario, actualizar el número de likes basado en la respuesta del servidor
      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p.id_post === postId ? { ...p, likes: data.likes } : p
        )
      );

    } catch (error) {
      console.error('Error al actualizar el like:', error.message);
      // Si hubo un error, revertir el estado de likes en el UI
      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p.id_post === postId 
            ? { ...p, likes: alreadyLiked ? p.likes + 1 : p.likes - 1 } 
            : p
        )
      );
      // Revertir el estado de userLikes
      setUserLikes((prevLikes) => ({ ...prevLikes, [postId]: alreadyLiked }));
    }
  };

  return (
    <div className="absolute mt-[5.2%] ml-[18%] bg-white w-[57.1%] p-[1%]">
      {posts.map((post) => (
        <div
          key={post.id_post} // Asegúrate de que este ID es correcto
          className="text-gray-500 bg-gray-300 h-[45vh] w-[100%] p-[1%] rounded-xl mb-[1%]"
        >
          <h1 className="text-[25px]">{post.title}</h1>
          <p className="absolute mt-[-5%] ml-[83%]">
            {format(post.creation_date, 'MM/dd/yyyy')}
          </p>
          <p>{post.description}</p>
          <div className="absolute mt-[23.9%] ml-[-1%] w-[100%] text-[20px]">
            <button
                className={`border-2 border-r-0 border-black w-[32.2%] rounded-bl-xl ${userLikes[post.id_post] ? 'text-white bg-purple-500' : ''}`}
                onClick={() => handleLikeClick(post)} // Pasa el objeto post completo
              >
                {post.likes} Likes
              </button>
            <link to="/home/post/comments">
              <button 
                  className={'border-2 border-black w-[32.2%] '}>Comentarios</button>
              <button className="border-2 border-l-0 border-black w-[32.2%] rounded-br-xl">
                Compartir
              </button>
            </link>
          </div>
        </div>
      ))}
    </div>
  );
};
