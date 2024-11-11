import bcrypt from 'bcrypt'
import pkg from 'pg' // Importa el paquete pg
import { SALT_ROUNDS } from './config.js'
const { Pool } = pkg
// Configura el pool de conexiones
export const pool = new Pool({
  host: 'localhost',
  database: 'miglenest',
  user: 'postgres',
  password: 'root'
})
export class User {
  static async create({ username, email, password, userType }) {
    // Validaciones básicas
    Validation.username(username)
    Validation.email(email)
    Validation.password(password)
    // Conectar con la base de datos usando el pool
    const client = await pool.connect()
    try {
      // Verificar si ya existe el usuario
      const queryText = 'SELECT * FROM public.normaluser WHERE username = $1 OR email = $2'
      const result = await client.query(queryText, [username, email])
      if (result.rows.length > 0 || result.rows.length > 0) {
        throw new Error('Username or email already exists')
      }
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
      // Insertar el nuevo usuario en la base de datos
      const insertQuery = `
        INSERT INTO public.normaluser (username, email, password, creation_date, profile_img, background, description)
        VALUES ($1, $2, $3, CURRENT_TIMESTAMP, 'default.png', 'defaultBackground.png',  '')
        RETURNING id_user;
      `
      const insertResult = await client.query(insertQuery, [username, email, hashedPassword])
      // Retornar el nuevo usuario creado
      return insertResult.rows[0]
    } catch (error) {
      alert.error('Error creando normalUser', error)
      throw error      
    } finally {
      client.release() // Asegúrate de liberar el cliente
    }
  }
  static async findOne({ username }) {
    const queryText = 'SELECT username, profile_img, background, description AS desc, creation_date FROM public.normalUser WHERE username = $1'
    const result = await pool.query(queryText, [username]) && await pool.query(queryText, [username])
    if (result.rows.length === 0) return null // Si no se encuentra el usuario
    const user = result.rows[0]
    // Formatea la fecha de creación a 'DD/MM/YYYY'
    const formattedDate = new Date(user.creation_date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
    return {
      username: user.username,
      profile_img: `http://localhost:4000/uploads/profiles/${user.profile_img}`,
      desc: user.desc,
      join_date: formattedDate // Retorna la fecha formateada
    }
  }
  static async login({ email, password }) {
    Validation.email(email)
    Validation.password(password)
    const client = await pool.connect()
    const queryText = 'SELECT * FROM public.normalUser WHERE email = $1'
    const result = await client.query(queryText, [email])
    // Verificar si el usuario no existe
    const user = result.rows[0]
    if (result.rows.length === 0) {
      throw new Error('The user does not exist')
    }
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) throw new Error('Invalid password')
    // const { password: _, ...publicUser } = user
    const joinDate = new Date(user.creation_date)
    const formattedDate = joinDate.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
    return {
      iduser: user.id_user,
      username: user.username,
      profile_img: user.profile_img,
      background: user.background,
      desc: user.description,
      join_date: formattedDate
    }
  }
  static async createPost({ title, description, fyle, typefile, id_category, id_user }) {
    const queryText = `
      INSERT INTO post (title, description, creation_date, id_category, id_user, fyle, typefile)
      VALUES ($1, $2, CURRENT_TIMESTAMP, $3, $4, $5, $6)
      RETURNING *;
    `;
    const result = await pool.query(queryText, [title, description, id_category, id_user, fyle, typefile]);
    return result.rows[0];
  }
  static async getPosts(limit = 20) {
    const queryText = `
      SELECT p.id_post, p.title, p.description, p.creation_date, p.fyle,
             COALESCE(COUNT(l.id_user), 0) AS likes
      FROM public.post p
      LEFT JOIN likes l ON p.id_post = l.id_post
      GROUP BY p.id_post
      ORDER BY p.creation_date DESC
      LIMIT $1;
    `;

    try {
      const result = await pool.query(queryText, [limit]);
      return result.rows.map(post => {
        // Formateo de la fecha de creación a 'DD/MM/YYYY' para cada post
        const formattedDate = new Date(post.creation_date).toLocaleDateString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });
        return {
          ...post,
          creation_date: formattedDate,
        };
      });
    } catch (error) {
      console.error('Error al obtener los posts:', error);
      throw new Error('Ocurrió un problema al intentar obtener los posts');
    }
}
// En tu User Repository
static async getPostById(decodedId) {
  const queryText = `
    SELECT p.id_post, p.title, p.description, p.creation_date, p.fyle,
           COALESCE(COUNT(l.id_user), 0) AS likes
    FROM public.post p
    LEFT JOIN likes l ON p.id_post = l.id_post
    WHERE p.id_post = $1
    GROUP BY p.id_post;
  `;

  try {
    const result = await pool.query(queryText, [decodedId]);
    
    if (result.rows.length === 0) {
      throw new Error('Post no encontrado');
    }

    // Formateo de la fecha de creación a 'DD/MM/YYYY'
    const post = result.rows[0];
    const formattedDate = new Date(post.creation_date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    return {
      ...post,
      creation_date: formattedDate,
    };
  } catch (error) {
    console.error('Error al obtener el post:', error);
    throw new Error('Ocurrió un problema al intentar obtener el post');
  }
}
  static async toggleLike({ userId, postId }) {
    const client = await pool.connect();
    try {
      // Verifica si el usuario ya dio like
      const likeCheckQuery = 'SELECT * FROM likes WHERE id_user = $1 AND id_post = $2';
      const likeCheckResult = await client.query(likeCheckQuery, [userId, postId]);
      if (likeCheckResult.rows.length > 0) {
        // Si ya dio like, eliminar el like
        await client.query('DELETE FROM likes WHERE id_user = $1 AND id_post = $2', [
          userId,
          postId,
        ]);
        // Decrementa el contador de likes en el post
        await client.query('UPDATE post SET likes = likes - 1 WHERE id_post = $1', [postId]);
      } else {
        // Si no ha dado like, añadir el like
        await client.query(
          'INSERT INTO likes (id_user, id_post, creation_date) VALUES ($1, $2, CURRENT_TIMESTAMP)',
          [userId, postId]
        );
        // Incrementa el contador de likes en el post
        await client.query('UPDATE post SET likes = likes + 1 WHERE id_post = $1', [postId]);
      }
      // Obtén el nuevo número de likes
      const updatedPost = await client.query('SELECT likes FROM post WHERE id_post = $1', [postId]);
      // Verifica que el post exista
      if (updatedPost.rows.length === 0) {
        throw new Error('Post not found');
      }
      return updatedPost.rows[0].likes; // Retorna el nuevo número de likes
    } catch (error) {
      console.error('Error al manejar el like:', error);
      throw error;
    } finally {
      client.release(); // Asegúrate de liberar el cliente de la base de datos
    }
  }  
  static async userLikedPost(userId, postId) {
    const result = await pool.query(
      'SELECT * FROM likes WHERE id_user = $1 AND id_post = $2',
      [userId, postId]
    );
    return result.rows.length > 0; // Si hay resultados, el usuario ya le dio like al post
  }

  static async searchPosts(query) {
    console.log('Searching for query:', query);  // Verifica el valor de query

    try {
        const result = await pool.query(
            'SELECT * FROM post WHERE title ILIKE $1',
            [`%${query}%`]
        );
        console.log('Search result:', result.rows);  // Verifica los resultados
        return result.rows;
    } catch (error) {
        console.error('Error executing query:', error);  // Manejo de errores
        throw error;
    }
}
  static async getComments(limit = 30) {
    const queryText = `
      SELECT c.id_comment, c.content, c.creation_date             
      FROM public.comment c      
      GROUP BY p.id_comment
      ORDER BY p.creation_date DESC
      LIMIT $1;
    `;

    try {
      const result = await pool.query(queryText, [limit]);
      return result.rows.map(comments => {
        // Formateo de la fecha de creación a 'DD/MM/YYYY' para cada post
        const formattedDate = new Date(comments.creation_date).toLocaleDateString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });
        return {
          ...comments,
          creation_date: formattedDate,
        };
      });
    } catch (error) {
      console.error('Error al obtener los comentarios:', error);
      throw new Error('Ocurrió un problema al intentar obtener los comentarios');
    }
}
}
class Validation {  
  static username(username) {
    //verificar si el username es de tipo string
    if (typeof username !== 'string') throw new Error('Username must be a string');
    //Eliminar espacios al inicio y al final
    username = username.trim()
    //verificar si el username esta vacio despues de eliminar espacios
    if (username.length === 0) throw new Error('Username cannot be empty');
    //verificar si hay espacios en el medio
    if (/\s/.test(username)) throw new Error ('Username cannot contain spaces') // "/\s/" se utiliza para comprobar si hay espacios en el medio del username
    //verificar si el username tiene menos de 3 caracteres o mas de 50
    if (username.length < 3 || username.length > 50) throw new Error('Username must be at least 3 characters long and maximun 50 characters long');
    // Verificar caracteres permitidos: solo letras, números y guiones bajos
    if (!/^[a-zA-Z0-9_]+$/.test(username)) throw new Error('Username can only contain letters, numbers, and underscores');    
    return username;
  }
  static email(email) {
      if (typeof email !== 'string') throw new Error('Email must be a string');
      email = email.trim()
      if (email.length === 0) throw new Error ("Email cannot be empty");
      if (!email.includes('@')) throw new Error('Invalid email format');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Invalid email format');
      if (email.length < 5 || email.length > 254) throw new Error('Email must be between 5 and 254 characters long');   
  }
  static password(password) {
      if (typeof password !== 'string') throw new Error('Password must be a string');
      if (password.length < 4) throw new Error('Password must be at least 4 characters long');
      if (password.length > 64) throw new Error('Password must be at maximun 44 characters long');
      if (!/[A-Z]/.test(password)) throw new Error('Password must contain at least one UPPERCASE letter');    
      if (!/[a-z]/.test(password)) throw new Error('Password must contain at least one lowercase letter');
      if (!/[0-9]/.test(password)) throw new Error('Password must contain at least one number (0 - 9)');
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) throw new Error('Password must contain at least one special character');      
      if (this.email === password || this.username === password) throw new Error('Password cannot be same as email or username');
  }
  static postTitle(postTitle) {
    if (typeof postTitle !== 'string') throw new Error('Title must be a string');
    if (postTitle.length < 4) throw new Error('Title must be at least 4 characters long');
    if (postTitle.length > 30) throw new Error('Title must not be more than 30 characters long');
  }

  static postDescription(postTitle, postDescription) {
    if (typeof postDescription !== 'string') throw new Error('Description must be a string');
    if (postDescription.length < 4) throw new Error('Description must be at least 4 characters long');
    if (postDescription.length > 300) throw new Error('Description must not be more than 300 characters long');
    const forbiddenWords = [
    // Español
    'cabrón', 'pendejo', 'chingar', 'hijo de puta', 'güey', 'boludo', 'gil', 'gonorrea', 'marica', 'weón', 'conchetumadre', 'hijo de mil puta', 'mierda', 'chucha', 'concha de su madre',    
    // Inglés
    'asshole', 'bastard', 'cunt', 'motherfucker', 'shithead', 'dumbass', 'bitch','fuck'];    
    if (typeof postTitle !== 'string') throw new Error('Title must be a string');
    if (postDescription.length < 4) throw new Error('Title must be at least 4 characters long');
    if (postDescription.length > 30) throw new Error('Title must not be more than 30 characters long');
    if (!/^[a-zA-Z0-9\s]+$/.test(postDescription)) throw new Error('Title can only contain letters, numbers, and spaces');     
    if (forbiddenWords.some(word => postDescription.toLowerCase().includes(word))) throw new Error('Title contains inappropriate content');      
  }
}