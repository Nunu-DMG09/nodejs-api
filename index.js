import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';

// Creando el objeto de la aplicación
const app = express();
app.use(bodyParser.json());

const readData= () => 
{
    try {
        const data = fs.readFileSync('./db.json', 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error al leer el archivo:', error);
        return null;
    }
}
const writeData = (data) => {
    try {
        fs.writeFileSync('./db.json', JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error('Error al escribir el archivo:', error);
    }
}


// Definiendo una ruta para el endpoint raíz
app.get('/', (req, res) => {
    res.send('Bienvenido a mi primera API con Node JS-CHICLAYO');
});

// Definiendo una ruta para obtener la lista de libros
app.get("/books", (req, res) => {
    const data = readData();
    res.json(data.books);
});

// Definiendo una ruta para obtener un libro por su ID
app.get("/books/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const book = data.books.find((book) => book.id === id);
    if (book) {
        res.json(book);
    } else {
        res.status(404).send('Libro no encontrado');
    }
});


// ...existing code...
app.post("/books", (req, res) => {
    console.log('DEBUG: POST /books body =', req.body);
    const data = readData();
    const body = req.body;
    const newBook = {
       id: data.books.length + 1,
       ...body
    };
    data.books.push(newBook);
    writeData(data);
    res.json(newBook);
});

// Iniciando el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});

