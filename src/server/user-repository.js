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

export class User {
  static async create ({ username, email, password }) {
    // Validaciones básicas
    Validation.username(username)
    Validation.email(email)
    Validation.password(password)
    // Conectar con la base de datos usando el pool
    const client = await pool.connect()
    try {
      // Verificar si ya existe el usuario
      const queryText = 'SELECT * FROM public.usuario WHERE username = $1 OR email = $2'
      const result = await client.query(queryText, [username, email])
      if (result.rows.length > 0) {
        throw new Error('Username or email already exists')
      }

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
      // Insertar el nuevo usuario en la base de datos
      const insertQuery = `
        INSERT INTO public.usuario (username, email, password, fecha_creacion, profile_img, descripcion)
        VALUES ($1, $2, $3, CURRENT_TIMESTAMP, 'default.png', '')
        RETURNING id_usuario;
      `
      const insertResult = await client.query(insertQuery, [username, email, hashedPassword])
      console.log('Usuario creado exitosamente con ID:', insertResult.rows[0].id_usuario)
      // Retornar el nuevo usuario creado
      return insertResult.rows[0]
    } catch (error) {
      console.error('Error creando usuario', error)
      throw error
    } finally {
      client.release() // Asegúrate de liberar el cliente
    }
  }

  static async findOne ({ username }) {
    const queryText = 'SELECT * FROM public.usuario WHERE username = $1'
    const result = await pool.query(queryText, [username])
    return result.rows[0]
  }

  static async login ({ username, password }) {
    Validation.username(username)
    Validation.password(password)
    const client = await pool.connect()
    const queryText = 'SELECT * FROM public.usuario WHERE username = $1'
    const result = await client.query(queryText, [username])
    // Verificar si el usuario no existe
    const user = result.rows[0]

    if (result.rows.length === 0) {
      throw new Error('The user does not exist')
    }
    const isValid = bcrypt.compare(password, user.password)

    if (!isValid) {
      throw new Error('Invalid password')
    }

    return user
  }
}

class Validation {
  static username (username) {
    if (typeof username !== 'string') throw new Error('Username must be a string')
    if (username.length < 3) throw new Error('Username must be at least 3 characters long')
  }

  static email (email) {
    if (typeof email !== 'string') throw new Error('Email must be a string')
    if (!email.includes('@')) throw new Error('Invalid email format')
  }

  static password (password) {
    if (typeof password !== 'string') throw new Error('Password must be a string')
    if (password.length < 4) throw new Error('Password must be at least 4 characters long')
  }
}
