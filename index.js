// index.js
const express = require('express');
const app = express();
const fs = require('fs');
const ExcelJS = require('exceljs');
const dayjs = require('dayjs');
const cors = require('cors');
const { guardarEnExcel, obtenerDatos } = require('./excelFunctions'); // Asegúrate de ajustar la ruta según tu estructura de archivos

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const excelFilePath = './planilla.xlsx';

app.post('/guardar-en-excel', guardarEnExcel);
app.get('/obtener-datos', obtenerDatos);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// excelFunctions.js
const guardarEnExcel = (req, res) => {
    // Código para guardar datos en Excel...
};

const obtenerDatos = (req, res) => {
    // Código para obtener datos de Excel...
};

module.exports = { guardarEnExcel, obtenerDatos };
