import bcrypt from 'bcrypt'
import pkg from 'pg' // Importa el paquete pg
import { SALT_ROUNDS } from './config.js'
const { Pool } = pkg // Desestructura Pool desde el paquete


// Configura el pool de conexiones
export const pool = new Pool({
  host: 'localhost',
  database: 'miglenest',
  user: 'postgres',
  password: 'root'
})

export const poolDeme = new Pool({
  host: 'localhost',
  database: 'miglenest',
  user: 'demetrio',
  password: 'Bjadfj182503#',
  port: 5432
})

export class User {
  static async create ({ username, email, password, userType }) {
    // Validaciones básicas
    Validation.username(username)
    Validation.email(email)
    Validation.password(password)
    // Conectar con la base de datos usando el pool
    const client = userType === 'demetrio' ? await poolDeme.connect() : await pool.connect();
    try {
      // Verificar si ya existe el usuario
      const queryText = 'SELECT * FROM public.normalUser WHERE username = $1 OR email = $2'
      const result = await client.query(queryText, [username, email])
      

      if (result.rows.length > 0 || result.rows.length > 0) {
        throw new Error('Username or email already exists')
      }

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
      // Insertar el nuevo usuario en la base de datos
      const insertQuery = `
        INSERT INTO public.normalUser (username, email, password, creation_date, profile_img, background, description)
        VALUES ($1, $2, $3, CURRENT_TIMESTAMP, 'default.png', 'defaultBackground.png',  '')
        RETURNING id_user;
      `
      const insertResult = await client.query(insertQuery, [username, email, hashedPassword])      
      // Retornar el nuevo usuario creado
      return insertResult.rows[0] 
    } catch (error) {
      console.error('Error creando normalUser', error)
      throw error
    } finally {
      client.release() // Asegúrate de liberar el cliente
    }
  }

  static async findOne ({ username }) {
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

  static async login ({ email, password }) {
    Validation.email(email)
    Validation.password(password)
    const client = await pool.connect() && await poolDeme.connect();
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

      username: user.username,
      profile_img: user.profile_img,
      background: user.background,
      desc: user.description,
      join_date: formattedDate

    }
  }
  static async createPost({ title, description, file, typefile, id_category, id_user }) {
    const queryText = `
      INSERT INTO post (title, description, creation_date, id_category, id_user, file, typefile)
      VALUES ($1, $2, CURRENT_TIMESTAMP, $3, $4, $5, $6)
      RETURNING *;
    `;
    const result = await pool.query(queryText, [title, description, id_category, id_user, file, typefile]) && await poolDeme.query(queryText, [title, description, id_category, id_user, file, typefile]);
  
    return result.rows[0];
  }
}
class Validation {
  static username(username) {
      if (typeof username !== 'string') throw new Error('Username must be a string');
      if (username.length < 3) throw new Error('Username must be at least 3 characters long');
  }

  static email(email) {
      if (typeof email !== 'string') throw new Error('Email must be a string');
      if (!email.includes('@')) throw new Error('Invalid email format');
  }

  static password(password) {
      if (typeof password !== 'string') throw new Error('Password must be a string');
      if (password.length < 4) throw new Error('Password must be at least 4 characters long');
  }

  static postTitle(postTitle) {
      if (typeof postTitle !== 'string') throw new Error('Title must be a string');
      if (postTitle.length < 4) throw new Error('Title must be at least 4 characters long');
      if (postTitle.length > 30) throw new Error('Title must not be more than 30 characters long');
  }

  static postDescription(postDescription) {
      if (typeof postDescription !== 'string') throw new Error('Description must be a string');
      if (postDescription.length < 4) throw new Error('Description must be at least 4 characters long');
      if (postDescription.length > 300) throw new Error('Description must not be more than 300 characters long');
  }
}
