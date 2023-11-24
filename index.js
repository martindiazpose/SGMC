const express = require('express');
const app = express();
const fs = require('fs');
const ExcelJS = require('exceljs');
const dayjs = require('dayjs');
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const excelFilePath = './planilla.xlsx';

app.post('/guardar-en-excel', (req, res) => {
    // Código para guardar datos en Excel...
});

app.get('/obtener-datos', (req, res) => {
    // Código para obtener datos de Excel...
});

// Utiliza process.env.PORT para obtener el puerto asignado por Heroku
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
