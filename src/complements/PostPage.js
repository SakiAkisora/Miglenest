import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

const PostPage = () => {
  const { encodedId } = useParams();  // Obtiene el parámetro de la URL
  const [post, setPost] = useState(null);
  const [userLikes, setUserLikes] = useState({});

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!encodedId) {
          return;
        }

        // Decodifica el ID de Base64
        const decodedId = atob(encodedId);  // atob() decodifica Base64

        // Hacer la solicitud al backend para obtener el post
        const response = await fetch(`http://localhost:4000/${encodedId}`);
        const data = await response.json();

        if (response.ok) {
          setPost(data);
        } else {
          console.error('Post no encontrado desde el front');
        }
      } catch (error) {
        console.error('Error al obtener el post:', error);
      }
    };

    fetchPost();
  }, [encodedId]);

  if (!post) {
    return <div>Cargando...</div>;
  }

  const handleLikeClick = async (post) => {
    const postId = post.id_post;
    const alreadyLiked = userLikes[postId] || false;

    setUserLikes((prevLikes) => ({
      ...prevLikes,
      [postId]: !alreadyLiked,
    }));

    try {
      const response = await fetch('http://localhost:4000/toggleLike', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }

      const data = await response.json();

      setPost((prevPost) => ({
        ...prevPost,
        likes: data.likes,
      }));
    } catch (error) {
      setPost((prevPost) => ({
        ...prevPost,
        likes: alreadyLiked ? prevPost.likes + 1 : prevPost.likes - 1,
      }));
      setUserLikes((prevLikes) => ({ ...prevLikes, [postId]: alreadyLiked }));
    }
  };

  const shareAcross = (post) => {
    const encodedId = btoa(post.id_post.toString());

    const shareData = {
      title: post.title,
      text: post.description,
      url: `http://localhost:3000/${encodedId}`, // URL con el ID codificado
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    } else {
      console.log('No soportado');
    }
  };

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
            className={`border-2 border-r-2 border-black w-[32.2%] ${userLikes[post.id_post] ? 'text-white bg-purple-500' : ''}`}
            onClick={() => handleLikeClick(post)}
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
