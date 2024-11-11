import React, { useEffect, useState } from 'react';
import { format } from 'date-fns'

export const CommentVisualization = ({setError, setHasComments}) => {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        const fetchComments = async () => {
          try {
            const response = await fetch('http://localhost:4000/getComments', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ limit: 0 }),
            });
    
            if (!response.ok) throw new Error('Error al obtener los comentarios');
    
            const data = await response.json();
            if (data.length === 0) {
              setHasComments(false);
            } else {
              const processedData = data.map((comment) => {
                const creationDate = new Date(comment.creation_date);
                const formattedCreationDate = isNaN(creationDate.getTime())
                  ? new Date()
                  : creationDate;
    
                // Inicializar el estado de likes del usuario para este post
                
                return {
                  ...comment,
                  creation_date: formattedCreationDate,
                  formatted_creation_date: format(formattedCreationDate, 'dd/MM/yyyy'),
                };
              });
    
              setComments(processedData);
              setHasComments(true);
            }
          } catch (error) {
            setError(error.message);
            setHasComments(false);
          }
        };
        fetchComments();        
    },[setError, setHasComments])
    return(
        <div className="absolute mt-[5.2%] ml-[18%] bg-white w-[57.1%] p-[1%]">
      {comments.map((comment) => (
        <div
          key={comment.id_post} // Asegúrate de que este ID es correcto
          className="text-gray-500 bg-gray-300 h-[45vh] w-[100%] p-[1%] rounded-xl mb-[1%]"
        >          
          <p className="absolute mt-[-5%] ml-[83%]">
            {format(comment.creation_date, 'MM/dd/yyyy')}
          </p>
          <p>{comment.description}</p>          
        </div>
      ))}
    </div>
    );
};