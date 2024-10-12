import { PORT } from './config.js'
import { pool, User } from './user-repository.js'
import express from 'express'

const app = express()
app.use(express.json())

app.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const queryText = await User.login({ username, password })
    res.send({ queryText })
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
app.post('/logout', (req, res) => {})

app.post('/protected', (req, res) => {})

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
