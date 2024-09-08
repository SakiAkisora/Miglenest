const express = require('express');
const { Client }  = require("pg");
const cors = require('cors');
const createAuthRouter = require('./routes/auth');

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

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});