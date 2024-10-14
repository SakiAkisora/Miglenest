import cookieParser from 'cookie-parser'
import { PORT, SECRET_JWT_KEY } from './config.js'
import { pool, User } from './user-repository.js'
import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'

const corsOptions = {
  origin: 'http://localhost:3000', // Especifica el origen permitido
  credentials: true // Habilita el envío de cookies
}

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
      { id: user.id, email: user.email },
      SECRET_JWT_KEY,
      {
        expiresIn: '1h'
      })
    res
      .cookie('access_token', token, {
        httpOnly: true, // La cookie solo se puede acceder en el servidor
        secure:  process.env.NODE_ENV === 'production', // La cookie solo se puede acceder en https
        sameSite: 'Lax', // La cookie solo se puede acceder en el mismo dominio
        maxAge: 1000 * 60 * 60 // la cookie tiene un tiempo de validez de 1 hora
      })
      .send({ user, token })
  } catch (error) {
    res.status(401).send({ error: error.message })
  }
})

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body
  console.log(req.body)

  try {
    const newUser = await User.create({ username, email, password })
    res.status(201).send({ id: newUser.id_usuario })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})
app.post('/logout', (req, res) => {
  res
    .clearCookie('access_token')
    .json({ message: 'Logout successful ' })
})

app.get('/check-session', (req, res) => {
  const token = req.cookies.access_token;
  if (token) {
    try {
      const data = jwt.verify(token, SECRET_JWT_KEY)
      return res.status(200).json({ loggedIn: true, user: data })
    } catch (error) {
      console.error('Error verifying token:', error)
      return res.status(401).json({ loggedIn: false })
    }
  } else {
    return res.status(401).json({ loggedIn: false })
  }
})

app.post('/protected', (req, res) => {
  const token = req.cookies.access_token
  if (!token) {
    return res.status(403).send('Access not authorized')
  }

  try {
    const data = jwt.verify(token, SECRET_JWT_KEY)
    res.render('protected', { user: data })
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
