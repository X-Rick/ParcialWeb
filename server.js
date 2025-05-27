const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('docs')); // carga directamente las paginas q se encuentren en docs

app.use(express.urlencoded({ extended: true })); // Permite leer los datos del formulario

const fs = require('fs');
const path = require('path');

app.post('/submit', (req, res) => {
  const { id, nombre, apellido, titulo, autor, editorial, año } = req.body;

  // valida si falta algún dato, redirigir a error.html
  if (!id || !nombre || !apellido || !titulo || !autor || !editorial || !año) {
    return res.redirect('/error.html');
  }

  // crea el archivo txt, con la estrucutura y le coloca el id dependiendo del numero
  const contenido = `${id},${nombre},${apellido},${titulo},${autor},${editorial},${año}`;
  const nombreArchivo = `id_${id}.txt`;
  const rutaArchivo = path.join(__dirname, 'data', nombreArchivo);

  // Escribir el archivo
  fs.writeFile(rutaArchivo, contenido, (err) => {
    if (err) {
      return res.status(500).send('Error al guardar el archivo.');
    }

    // Descargar el archivo
    res.download(rutaArchivo, nombreArchivo);
  });
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
