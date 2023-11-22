const express = require('express');
const bodyParser = require('body-parser');
const xlsx = require('xlsx');
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Carpeta para tus archivos estáticos

app.post('/guardar-excel', (req, res) => {
    // Obtén los datos del formulario desde req.body y crea un objeto con ellos

    // Crear un archivo de Excel y escribir los datos
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet([/* Tu objeto con los datos */]);
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Datos');

    // Guardar el archivo de Excel en la carpeta raíz
    const excelFilePath = 'planilla.xlsx';
    xlsx.writeFile(workbook, excelFilePath);

    const responseHTML = `
    <p>Datos guardados en el archivo Excel.</p>
    <p><a href="http://192.168.80.8:3000/">Volver a comenzar</a></p>
`;

res.send(responseHTML);
});

module.exports = app;
