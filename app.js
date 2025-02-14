const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const booksRouter = require('./routes/books');
const cors = require('cors');

require('dotenv').config();

// Configurar conexión a MongoDB
mongoose.connect(process.env.MONGO_URL, {});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Conectado a MongoDB'));

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Rutas
app.use('/books', booksRouter);

// Iniciar el servidor
app.listen(3000, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:3000`);
  });
