import express from 'express';
import session from 'express-session'; // Cambiado a import
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
    res.status(400).json({ error: error.message });
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
app.post('/toggleLike', async (req, res) => {
  // Verifica si el usuario está autenticado
  if (!req.session.user) {
    return res.status(401).json({ error: 'Unauthorized' }); // Enviar 401 para indicar que no está autorizado
  }

  const { postId } = req.body; // Obtiene el ID del post
  const userId = req.session.user.id; // Obtiene el ID del usuario

  // Verifica que postId sea válido
  if (!postId) {
    return res.status(400).json({ error: 'Post ID is required' });
  }

  try {
    // Llama al método toggleLike en el repositorio de usuarios
    const likes = await User.toggleLike({ userId, postId });
    res.json({ likes }); // Responde con el nuevo número de likes
  } catch (error) {
    console.error('Error al actualizar el like:', error);
    res.status(500).json({ error: 'Error al manejar el like' });
  }
});
// Ruta para obtener un post
app.get('/watch', async (req, res) => {
  const { p: encodedId } = req.query;  // Obtener el parámetro 'p' de la query string

  if (!encodedId) {
      return res.status(400).json({ message: 'ID no proporcionado' });
  }

  try {
      // Decodificar el ID de Base64
      const decodedId = Buffer.from(encodedId, 'base64').toString('utf-8');
      const decodedIdInt = parseInt(decodedId, 10);

      if (isNaN(decodedIdInt)) {
          return res.status(400).json({ message: 'ID inválido' });
      }

      // Obtener el post desde el modelo (suponiendo que usas User.getPostById)
      const post = await User.getPostById(decodedIdInt);
      res.json(post);
  } catch (error) {
      console.error('Error al obtener el post:', error);
      res.status(404).json({ message: 'Post no encontrado' });
  }
});

app.post('/userLikedPost', async (req, res) => {
  try {
    const { postId } = req.body; // Obtiene el ID del post desde el body
    const userId = req.session.user.id; // Obtiene el ID del usuario desde la sesión

    // Comprobamos si el usuario ya ha dado like al post
    const result = await pool.query(
      'SELECT * FROM likes WHERE id_user = $1 AND id_post = $2',
      [userId, postId]
    );

    // Si hay una fila en el resultado, significa que el usuario ya ha dado like al post
    const userLiked = result.rows.length > 0;

    // Devolvemos un objeto con el estado de "userLiked"
    res.json({ userLiked });

  } catch (error) {
    console.error(error);
    res.status(500).send('Error en la base de datos');
  }
});

app.post('/search', async (req, res) => {
  const { query } = req.body; // Obtener el parámetro de consulta "query" del cuerpo de la solicitud

  console.log('Query parameter received:', query); // Verifica este valor

  if (!query) {
      console.log('No search query provided');
      return res.status(400).json({ message: 'No search query provided' });
  }

  try {
      const searchResults = await User.searchPosts(query);
      console.log('Search results:', searchResults);
      res.json(searchResults);
  } catch (error) {
      console.error('Error al buscar posts:', error.message);
      res.status(500).json({ message: 'Error al buscar posts', error: error.message });
  }
});