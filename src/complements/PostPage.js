import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';  // Cambiado para obtener los parámetros de la query
import { format } from 'date-fns';

const PostPage = () => {
  const location = useLocation();  // Obtiene la ubicación actual (incluidos los parámetros de la URL)
  const [post, setPost] = useState(null);
  const [userLikes, setUserLikes] = useState(false);

  // Obtiene el parámetro 'p' de la query string
  const encodedId = new URLSearchParams(location.search).get('p');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!encodedId) {
          return;
        }

        const newUrl = `http://localhost:4000/watch?p=${encodedId}`;  // Usamos 'encodedId' directamente en la URL

        const response = await fetch(newUrl);
        const data = await response.json();

        if (response.ok) {
          setPost(data);

          const decodedId = atob(encodedId);  // Decodifica el ID para la verificación del like
          const userLiked = await checkUserLikedPost(decodedId);
          setUserLikes(userLiked);  // Actualiza el estado de like
        } else {
          console.error('Post no encontrado');
        }
      } catch (error) {
        console.error('Error al obtener el post:', error);
      }
    };

    fetchPost();
  }, [encodedId]);

  const handleLikeClick = async () => {
    const alreadyLiked = userLikes;
    setUserLikes(!alreadyLiked);

    try {
      const response = await fetch('http://localhost:4000/toggleLike', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId: post.id_post }),
        credentials: 'include',
      });

      if (response.status === 401) {
        window.location.href = '/login';
        return;
      }

      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }

      const data = await response.json();
      setPost((prevPost) => ({
        ...prevPost,
        likes: data.likes,
      }));
    } catch (error) {
      console.error('Error al cambiar like:', error);
      setUserLikes(alreadyLiked);
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

  const checkUserLikedPost = async (postId) => {
    try {
      const response = await fetch('http://localhost:4000/userLikedPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId }),
        credentials: 'include',
      });

      const data = await response.json();
      return data.userLiked;
    } catch (error) {
      console.error('Error al verificar el like:', error);
      return false;
    }
  };

  if (!post) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="absolute mt-[5%] ml-[18%] bg-white w-[82%] p-[0%]">
      <div className="text-gray-500 bg-gray-300 h-[80vh] w-[100%] p-[1%] mb-[1%]">
        <h1 className="mt-[34%] text-[25px]">{post.title}</h1>
        <p className="absolute mt-[-5%] ml-[83%]">
          {format(new Date(post.creation_date), 'MM/dd/yyyy')}
        </p>
        <p>{post.description}</p>
        <div className="absolute mt-[0.9%] ml-[-1%] w-[30%] text-[20px]">
          <button
            className={`border-2 border-r-2 border-black w-[32.2%] ${userLikes ? 'text-white bg-purple-500' : ''}`}
            onClick={handleLikeClick}
          >
            {post.likes} Likes
          </button>
          <button
            className="border-2 border-l-0 border-black w-[32.2%]"
            onClick={() => shareAcross(post)} // Pasa el objeto post al hacer clic
          >
            Compartir
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
