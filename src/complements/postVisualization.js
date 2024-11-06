import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom'; // Importa Link

export const PostVisualization = ({ setError, setHasPosts }) => {
  const [posts, setPosts] = useState([]);
  const [userLikes, setUserLikes] = useState({});

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

            const userLiked = userLikes[post.id_post] || false;

            return {
              ...post,
              creation_date: formattedCreationDate,
              formatted_creation_date: format(formattedCreationDate, 'dd/MM/yyyy'),
              likes: post.likes || 0,
              userLiked,
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
  }, [setError, setHasPosts, userLikes]);

  const handleLikeClick = async (post) => {
    const postId = post.id_post;
    const alreadyLiked = userLikes[postId] || false;

    setPosts((prevPosts) =>
      prevPosts.map((p) =>
        p.id_post === postId
          ? { ...p, likes: alreadyLiked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );

    setUserLikes((prevLikes) => ({ ...prevLikes, [postId]: !alreadyLiked }));

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

      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p.id_post === postId ? { ...p, likes: data.likes } : p
        )
      );
    } catch (error) {
      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p.id_post === postId
            ? { ...p, likes: alreadyLiked ? p.likes + 1 : p.likes - 1 }
            : p
        )
      );
      setUserLikes((prevLikes) => ({ ...prevLikes, [postId]: alreadyLiked }));
    }
  };

  // Web Share API
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
    <div className="absolute mt-[5.2%] ml-[18%] bg-white w-[57.1%] p-[1%]">
      {posts.map((post) => (
        <div
          key={post.id_post}
          className="text-gray-500 bg-gray-300 h-[45vh] w-[100%] p-[1%] rounded-xl mb-[1%]"
        >
          {/* Envolver el título en un Link */}
          <Link to={`/${btoa(post.id_post.toString())}`} className="text-[25px]">
            {post.title}
          </Link>
          <p className="absolute mt-[-5%] ml-[83%]">
            {format(post.creation_date, 'MM/dd/yyyy')}
          </p>
          <p>{post.description}</p>
          <div className="absolute mt-[23.9%] ml-[-1%] w-[100%] text-[20px]">
            <button
              className={`border-2 border-r-0 border-black w-[32.2%] rounded-bl-xl ${userLikes[post.id_post] ? 'text-white bg-purple-500' : ''}`}
              onClick={() => handleLikeClick(post)}
            >
              {post.likes} Likes
            </button>
            <button className="border-2 border-black w-[32.2%]">Comentarios</button>
            <button
              className="border-2 border-l-0 border-black w-[32.2%] rounded-br-xl"
              onClick={() => shareAcross(post)}
            >
              Compartir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
