const express = require('express');
const router = express.Router();
const Book = require('../models/book');


// Obtener todos los libros
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear un nuevo libro
router.post('/', async (req, res) => {
  const book = new Book({
    name: req.body.name,
    isbn: req.body.isbn,
    status: req.body.status,
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    console.log("error", err.message);
    res.status(400).json({ message: err.message });
  }
});

// Obtener un libro por ID
router.get('/:id', getBook, (req, res) => {
  res.json(res.book);
});

// Actualizar un libro
router.patch('/:id', getBook, async (req, res) => {  
  if (req.body.name != null) {
    res.book.name = req.body.name;
  }
  if (req.body.isbn != null) {
    res.book.isbn = req.body.isbn;
  }
  if (req.body.status != null) {
    res.book.status = req.body.status;
  }

  try {
    const updatedBook = await res.book.save();
    res.json(updatedBook);
  } catch (err) {
    console.log(err.message);
    
    res.status(400).json({ message: err.message });
  }
});

// Eliminar un libro
router.delete('/:id', getBook, async (req, res) => {
  try {
    await res.book.remove();
    res.json({ message: 'Libro eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware para obtener un libro por ID
async function getBook(req, res, next) {
  let book;
  try {
    book = await Book.findById(req.params.id);
    if (book == null) {
      return res.status(404).json({ message: 'No se encontró el libro' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.book = book;
  next();
}

module.exports = router;
