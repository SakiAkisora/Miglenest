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

}