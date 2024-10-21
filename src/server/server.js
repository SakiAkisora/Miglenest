import cookieParser from 'cookie-parser'
import { PORT, SECRET_JWT_KEY } from './config.js'
import { pool, User } from './user-repository.js'
import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import path from 'path'
import { fileURLToPath } from 'url'

const corsOptions = {
  origin: 'http://localhost:3000', // Especifica el origen permitido
  credentials: true // Habilita el envío de cookies
}
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))

app.use((req, res, next) => {
  const token = req.cookies.access_token
  req.session = { user: null }

  try {
    const data = jwt.verify(token, SECRET_JWT_KEY)
    req.session.user = data
  } catch (error) { }
  next()
})

app.get('/', (req, res) => {
  const { user } = req.session
  res.render('index', user)
})

app.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.login({ email, password })
    const token = jwt.sign(
      { id: user.id_user, username: user.username },
      SECRET_JWT_KEY,
      {
        expiresIn: '1h'
      }
    )
    res
      .cookie('access_token', token, {
        httpOnly: true, // La cookie solo se puede acceder en el servidor
        secure: process.env.NODE_ENV === 'production', // La cookie solo se puede acceder en https
        sameSite: 'lax', // La cookie solo se puede acceder en el mismo dominio
        maxAge: 1000 * 60 * 60 // la cookie tiene un tiempo de validez de 1 hora
      })
      .send({ user })
  } catch (error) {
    res.status(401).send({ error: error.message })
  }
})

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body

  try {
    const newUser = await User.create({ username, email, password })
    res.status(201).send({ id: newUser.id_user })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})
app.post('/logout', (req, res) => {
  res
    .clearCookie('access_token')
    .json({ message: 'Logout successful ' })
})

app.post('/createPost', async (req, res) => {
  const { title, description, id_category, id_user, file, typefile } = req.body

  try{
    const newPost = await User.createPost( 
      {
        title,
        description,
        id_category,
        id_user,
        file,
        typefile
      })
      res.status(201).send({ id: newPost.id_post })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

app.post('/protected', async (req, res) => {
  const token = req.cookies.access_token
  if (!token) {
    return res.status(403).send('Acceso denegado para crear la cookie')
  }

  try {
    const data = jwt.verify(token, SECRET_JWT_KEY)

    const user = await User.findOne({ username: data.username })

    // eslint-disable-next-line object-curly-newline
    res.json({ user:
    {
      username: user.username,
      profile_img: user.profile_img,
      desc: user.desc,
      join_date: user.join_date
    }
    })
  } catch (error) {
    console.error('Token verification failed:', error)
    res.status(401).send('Access not authorized')
  }
})

pool.connect(err => {
  if (err) {
    console.error('Error al conectar a la base de datos: ', err)
    throw err
  } else {
    console.log('Conexion exitosa a la base de datos')
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

app.post('/getUserId', async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ error: 'Usuario no autenticado' });
  }

  try {
    const data = jwt.verify(token, SECRET_JWT_KEY);
    const userId = data.id_user; // Asegúrate de que esta propiedad contenga el ID del usuario
    res.json({ id_user: userId }); // Envía el ID del usuario en la respuesta
  } catch (error) {
    console.error('Error en la verificación del token:', error);
    res.status(401).json({ error: 'Access not authorized' });
  }
});
