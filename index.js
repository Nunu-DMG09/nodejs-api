import express from 'express';

// Creando el objeto de la aplicación
const app = express();

// Definiendo una ruta para el endpoint raíz
app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});

// Iniciando el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});

