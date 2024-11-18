import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';

export const CommentVisualization = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment ] = useState(""); 
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { id_post } = useParams();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch('http://localhost:4000/comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },          
          body: JSON.stringify({ id_post }),
        });

        if (!response.ok) {
          throw new Error('Error al obtener los comentarios');
        }

        const data = await response.json();

        if (data.length === 0) {
          setComments([]); // No hay comentarios
        } else {
          const processedData = data.map((comment) => {                        
            return {
              ...comment,
            };            
          });

          setComments(processedData); // Cargar comentarios
        }
      } catch (error) {
        setHasError(true);
        setErrorMessage(error.message);
      }
    };    
    fetchComments();
  }, [id_post]);
  const handleAddComment = async () => {
    if(!newComment.trim()) return;
    try{
      const response = await fetch('http://localhost:4000/addComments',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },        
        body:JSON.stringify({
          id_post, 
          content:newComment,
         }),
         credentials: "include",
      })
      if(!response.ok){
        throw new Error('Error al cargar el comentario')
      }
      const { comment : addedComment } = await response.json();
      setComments((prevComments)=>[...prevComments, addedComment]);
      setNewComment('')
    }catch(error){
      setHasError(error)
      setErrorMessage(error.message)
    }
  }
    if (hasError) {
      return (
        <div className="error-banner bg-red-500 text-white p-4 rounded-md">
          {errorMessage}
        </div>
      );
    }

    return (
      <div className="absolute mt-[5.2%] ml-[18%] bg-white w-[57.1%] p-[1%]">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.id_comment}
              className="relative text-gray-500 bg-gray-300 h-[20vh] w-[100%] p-[1%] rounded-xl mb-[1%]"
            >
              <small>Por usuario: { comment.id_user}</small>
              <p className="absolute top-2 right-4">
                {format(new Date(comment.creation_date), 'MM/dd/yyyy')}
              </p>
              <p>{comment.content}</p>
            </div>
          ))
        ) : (
          <div className="no-comments-banner text-gray-500 text-center">
            No hay comentarios disponibles.
          </div>
        )}
        <div className="new-comment-container flex mt-4">
          <input
            type="text"
            placeholder="Escribe un comentario..."
            className="border-2 border-gray-300 w-full p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            onClick={ handleAddComment }
            className="bg-purple-500 text-white px-4 py-2 rounded-r-md hover:bg-purple-700"
          >
            Enviar
          </button>
        </div>
      </div>      
    );
};

export default CommentVisualization;
