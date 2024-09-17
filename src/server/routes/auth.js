const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const createAuthRouter = (dbClient) => {
    router.post('/register', async (req, res) => {
        const { username, email, password, passwordConfirm } = req.body;

    if (password !== passwordConfirm) {
        return res.status(400).json({ message: 'Las contraseñas no coinciden' });
    }

    try {
        const result = await dbClient.query(
            'INSERT INTO usuario (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, password]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error al registrar el usuario:', error);  // Asegúrate de que esto imprima el error completo
        res.status(500).json({ message: 'Error al registrar el usuario', error: error.message });  // Incluye el mensaje del error en la respuesta
    }
    });

    router.post('/login', async (req, res) => {
        const { username, password } = req.body;
    
        try {
          const result = await dbClient.query('SELECT * FROM usuario WHERE username = $1', [username]);
    
          if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
          }
    
          const user = result.rows[0];
          const isValidPassword = await bcrypt.compare(password, user.password);
    
          if (!isValidPassword) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
          }
    
          // Generar token de autenticación
          const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    
          res.json({ token });
        } catch (error) {
          console.error('Error al autenticar:', error);
          res.status(500).json({ message: 'Error al autenticar' });
        }
      });


    return router;
}




module.exports = createAuthRouter;