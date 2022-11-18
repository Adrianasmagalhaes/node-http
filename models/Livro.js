const mongoose = require("mongoose");

const livroSchema = new mongoose.Schema({
  id: { type: String },
  title: { type: String, require: true },
  autor: { type: String, require: true },
});

const livro = mongoose.model("livro", livroSchema);

module.exports = livro;
