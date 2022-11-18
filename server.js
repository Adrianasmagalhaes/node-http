const express = require("express");
const cors = require("cors");
const app = express();

const db = require("./config/dbConfig");
const livro = require("./models/Livro");

db.once("open", () => {
  console.log("conexão realizada com sucesso!");
});

const bodyParser = require("body-parser");

const hostname = "localhost";
const port = 5000;

const books = [
  {
    _id: 1,
    title: "O Dia do Curinga",
    autor: "Jostein Gaarden",
    favorito: true,
  },
  {
    _id: 2,
    title: "O mundo de Sophia",
    autor: "Jostein Gaarden",
    favorito: true,
  },
  { _id: 3, title: "A casa", autor: "Raquel de Queiroz", favorito: true },
];
app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

//uri
app.get("/", (req, res) => {
  res.json({ nome: "Adriana S!" });
});

app.get("/html", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.get("/books", (req, res) => {
  // res.send(books);
  livro.find((err, livrosDoBancos) => {
    if (err) res.status(400);

    res.status(200).json(livrosDoBancos);
  });
});

app.post("/books", (req, res) => {
  //o body contém a lista que é enviada
  let livro = new livro({ title: "teste", autor: "teste" });
  livro.save(() => res.status(200).json(livro));
});

app.get("/books/:id", (req, res) => {
  const book = books.find((book) => book._id == req.params.id);
  if (book) res.send(book);
  else res.sendStatus(404);
});

app.delete("/books/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let index = books.findIndex((obj) => obj._id === id);
  console.log("index", index);

  books.splice(index, 1);
  res.send(books);
});
//patch
//Localizar o item a ser atualizado
//Pegar as informações nova (body)
app.patch("/books/:id", (req, res) => {
  let id = parseInt(req.params.id);

  let book = books.find((obj) => obj._id === id);
  console.log("book", book);

  let body = req.body;
  console.log("body", body);

  book.title = body.title;
  book.autor = body.autor;
  res.send(books);
});

app.listen(port, hostname, () => console.log(`http://${hostname}:${port}`));
