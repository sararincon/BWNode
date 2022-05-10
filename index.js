const Jimp = require("jimp");
const http = require("http");
const fs = require("fs");
const url = require("url");

http
  .createServer((req, res) => {
    // Paso 1
    if (req.url == "/") {
      res.writeHead(200, { "Content-Type": "text/html" });
      fs.readFile("index.html", "utf8", (err, html) => {
        res.end(html);
      });
    }
    // Paso 2
    if (req.url == "/estilos") {
      res.writeHead(200, { "Content-Type": "text/css" });
      fs.readFile("estilos.css", (err, css) => {
        res.end(css);
      });
    }

    const params = url.parse(req.url, true).query; //parsea a un objeto
    const urlImagen1 = params.urlImagen;
    const { urlImagen } = params; // del objeto creado le estoy sacando un valor
    console.log(urlImagen1);

    // Esta imagen funciona: https://www.purina-latam.com/sites/g/files/auxxlc391/files/styles/kraken_generic_max_width_960/public/download-21.png?itok=xwvQwAhn
    if (req.url.includes("/resultado")) {
      Jimp.read(urlImagen, function (err, imagen) {
        if (err) throw err;
        imagen
          .resize(300, Jimp.AUTO)
          .quality(60)
          .grayscale()
          .writeAsync("img.jpg")
          .then(() => {
            fs.readFile("img.jpg", (err, Imagen) => {
              res.writeHead(300, { "Content-Type": "image/jpeg" });
              res.end(Imagen);
            });
          });
      });
    }
  })
  .listen(3000, () => console.log("Servidor ON"));
