const express = require('express');
const { Client }  = require("pg");
const cors = require('cors');
const createAuthRouter = require('./routes/auth');
const verifyToken = require('./middleware/verifyToken');

const app = express();
const PORT = 4000;

const connection = new Client({
    host: "localhost",
    database: "miglenest",
    user: "postgres",
    password: "root"
});

connection.connect(err => {
    if (err) {
        console.error('Error al conectar a PostgreSQL:', err);
        throw err;
    } else {
        console.log("Conexión exitosa a PostgreSQL");
    }
});

app.use(cors());
app.use(express.json());

app.use('/api', createAuthRouter(connection));

// Ejemplo de una ruta protegida
app.get('/api/protected', verifyToken, (req, res) => {
    res.json({ message: `Bienvenido, usuario con ID ${req.user.id}` });
});

app.use((req, res, next) => {
    res.status(404).send({ message: 'Ruta no encontrada' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});