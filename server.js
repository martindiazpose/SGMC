const express = require('express');
const app = express();
const fs = require('fs');
const ExcelJS = require('exceljs');
const dayjs = require('dayjs');
const cors = require('cors'); // Agrega esta línea

app.use(cors()); // Agrega esta línea para permitir solicitudes CORS

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const excelFilePath = './planilla.xlsx';

app.post('/guardar-en-excel', (req, res) => {
    const workbook = new ExcelJS.Workbook();
    workbook.xlsx.readFile(excelFilePath)
        .then(() => {
            const worksheet = workbook.getWorksheet('FormularioData');
            let formData = req.body;
            formData.fecha = dayjs(formData.fecha).format('DD-MM-YYYY');
            worksheet.addRow(Object.values(formData));
            return workbook.xlsx.writeFile(excelFilePath);
        })
        .then(() => {
            console.log('Datos agregados al archivo Excel');
            const responseMessage = `
            <p>Tarea registrada correctamente.</p>
            <a href="http://192.168.80.8:3000/" class="btn btn-primary">Volver a comenzar</a>
            `;
            res.send(responseMessage);
        })
        .catch(error => {
            console.error('Error al guardar los datos en el archivo Excel:', error);
            const errorMessage = `
                Error al cargar la tarea, intente nuevamente. Si el error persiste, por favor <a href="/">contáctenos</a>.
            `;
            res.status(500).send(errorMessage);
        });
});
app.get('/obtener-datos', (req, res) => {
    const workbook = new ExcelJS.Workbook();
    workbook.xlsx.readFile(excelFilePath)
        .then(() => {
            const worksheet = workbook.getWorksheet('FormularioData');
            const data = [];
            worksheet.eachRow({ includeEmpty: true }, function(row, rowNumber) {
                data.push(row.values);
            });
            res.send(data);
        })
        .catch(error => {
            console.error('Error al obtener datos de Excel:', error);
            res.status(500).send('Error al obtener datos de Excel');
        });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});