const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const createAuthRouter = (dbClient) => {
    // Registro de usuarios
    router.post('/register', async (req, res) => {
        const { username, email, password, passwordConfirm } = req.body;

        if (password !== passwordConfirm) {
            return res.status(400).json({ message: 'Las contraseñas no coinciden' });
        }

        try {
            // Encriptar la contraseña
            const hashedPassword = await bcrypt.hash(password, 10);

            const result = await dbClient.query(
                'INSERT INTO usuario (username, email, password) VALUES ($1, $2, $3) RETURNING *',
                [username, email, hashedPassword]
            );
            res.status(201).json({ message: 'Usuario registrado exitosamente', user: result.rows[0] });
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
            res.status(500).json({ message: 'Error al registrar el usuario', error: error.message });
        }
    });

    // Inicio de sesión
    const bcrypt = require('bcrypt');

    router.post('/login', async (req, res) => {
      const { email, password } = req.body;
  
      try {
          const result = await dbClient.query('SELECT * FROM usuario WHERE email = $1', [email]);
  
          if (result.rows.length === 0) {
              return res.status(400).json({ message: 'Usuario no encontrado' });
          }
  
          const user = result.rows[0];
  
          const isMatch = await bcrypt.compare(password, user.password);
  
          if (!isMatch) {
              return res.status(400).json({ message: 'Contraseña incorrecta' });
          }
  
          // Generar token y enviar respuesta
          const token = jwt.sign({ id: user.id, email: user.email }, 'secretKey', { expiresIn: '1h' });
          res.json({ message: 'Inicio de sesión exitoso', token });
      } catch (error) {
          console.error('Error al iniciar sesión:', error);
          res.status(500).json({ message: 'Error en el servidor', error: error.message });
      }
  });
    return router;
};

module.exports = createAuthRouter;