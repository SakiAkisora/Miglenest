import express from 'express';
import session from 'express-session'; // Cambiado a import
import cookieParser from 'cookie-parser'; // Puedes eliminar esto si no usas cookies
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { PORT, SECRET_JWT_KEY } from './config.js';
import { pool, User } from './user-repository.js';
import multer from 'multer';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Especifica el origen permitido
  credentials: true // Habilita el envío de cookies
};

app.use(cors(corsOptions));

// Configuración de la sesión
app.use(session({
  secret: SECRET_JWT_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Cambiar a true si usas HTTPS
}));

const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  res.status(401).send('Unauthorized');
};

// Middleware para extraer información del usuario de la sesión
app.use((req, res, next) => {
  req.session.user = req.session.user || null; // Mantener la sesión
  next();
});

app.get('/', (req, res) => {
  const { user } = req.session;
  res.render('index', user);
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.login({ email, password });
    // Guarda el usuario en la sesión
    req.session.user = {
      id: user.iduser, // Guarda el id del usuario
      username: user.username,
    };

    res.json(user); // Envía la información del usuario como respuesta
  } catch (error) {
    res.status(400).send(error.message);
  }
});
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const newUser = await User.create({ username, email, password });
    res.status(201).send({ id: newUser.id_user });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Error en el logout');
    }
    res.json({ message: 'Logout successful' });
  });
}); 

// Configuración de almacenamiento para Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/uploads/post'); // Especifica la carpeta de destino
  },
  filename: (req, file, cb) => {
    // Cambia el nombre del archivo (agregar un timestamp)
    cb(null, Date.now() + path.extname(file.originalname)); // Agrega un timestamp al nombre del archivo
  },
});

// Inicializa Multer con la configuración de almacenamiento
const upload = multer({ storage: storage });

// Ruta para crear un nuevo post
app.post('/createPost', upload.single('file'), async (req, res) => {
  const { title, description, id_category } = req.body;

  // Verifica si el usuario está autenticado
  if (!req.session.user) {
    return res.status(401).send('Unauthorized');
  }

  try {
    // Cambia la ruta para almacenar en la base de datos
    const filePath = `uploads/post/${req.file.filename}`; // Almacena la ruta relativa
    const newPost = await User.createPost({
      title,
      description,
      id_category,
      id_user: req.session.user.id,
      fyle: filePath, // Asegúrate de que esto se ajuste a la nueva ruta
      typefile: req.file.mimetype, // Almacena el tipo de archivo
    });
    res.status(201).send({ id: newPost.id_post });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
app.post('/protected', async (req, res) => {
  if (!req.session.user) {
    return res.status(403).send('Acceso denegado');
  }

  try {
    const user = await User.findOne({ username: req.session.user.username }); // Usa el username almacenado en la sesión

    if (!user) {
      return res.status(404).send('Usuario no encontrado');
    }

    res.json({
      username: user.username,
      profile_img: user.profile_img, // Asegúrate de que este campo exista
      desc: user.desc || 'Sin descripción', // Proporciona un valor por defecto si no existe
      join_date: user.join_date, // Asegúrate de que este campo exista
    });
  } catch (error) {
    console.error('Error al buscar el usuario:', error);
    res.status(500).send('Error interno del servidor');
  }
});
pool.connect(err => {
  if (err) {
    console.error('Error al conectar a la base de datos: ', err);
    throw err;
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.post('/getUserId', isAuthenticated, (req, res) => {
  res.json({ id_user: req.session.user.id }); // Envía el ID del usuario almacenado en la sesión
});

app.post('/getPosts', async (req, res) => {
  const { limit } = req.body; // Opcionalmente, puedes pasar un límite desde el frontend

  try {
    const posts = await User.getPosts(limit || 10); // Llama al método `getPosts` con un límite por defecto de 10
    res.status(200).json(posts); // Envía la lista de posts al frontend
  } catch (error) {
    console.error('Error al obtener los posts:', error);
    res.status(500).json({ message: 'Error al obtener los posts' }); // Manejo de errores
  }
})