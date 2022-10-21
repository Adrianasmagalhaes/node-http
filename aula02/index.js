const express = require("express");

const app = express();
const bodyParser = require("body-parser");

const hostname = "192.168.3.85";
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
  res.send(books);
});

app.post("/books", (req, res) => {
  //o body contém a lista que é enviada
  const body= req.body
    console.log('body'.body);
    //percorre a 'sacola'
    body.map(obj =>books.push(obj) )
  

  res.send(books);
});

app.get("/books/:id", (req, res) => {
  const book = books.find((book) => book._id == req.params.id);
  if (book) res.send(book);
  else res.sendStatus(404);
});

app.delete("/books/:id", (req, res) =>{
  let id = req.params.id
  let index = books.findIndex(obj=> obj._id === id)

  books.splice(index, 1)
  res.send(books)
})

app.listen(port, hostname, () => console.log(`http://${hostname}:${port}`));
