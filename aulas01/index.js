const http = require("http");

const hostname = "192.168.3.85";
const port = 5000;

http
  .createServer((req, res) => {
    console.log(req.url);
    if (req.url === "/") {
      res.end("Home");
    }
    //res.end('Oi, que lindo cara!')
  })
  .listen(port, hostname, () =>
    console.log(`Servidor rodando http://${hostname}:${port}`)
  );
