const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  isbn: { type: String, required: true },
  status: { type: String, required: true },
});

module.exports = mongoose.model('Books', bookSchema);
