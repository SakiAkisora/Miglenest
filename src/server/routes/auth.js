const express = require('express');
const router = express.Router();


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
    return router;
}
module.exports = createAuthRouter;