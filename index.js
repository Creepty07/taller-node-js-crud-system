const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const empleados = require('./routes/empleados.js');
const path = require('path');

const PORT = process.env.PORT;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res, next) => {
    return res.status(200).json({
        message: "Inicio gestor de empleados Node JS S.A de C.V",
        code: 200
    });
});

app.get('/login', (req, res, next) => {
    return res.sendFile(path.join(__dirname, 'public', 'login.html'))
    });

app.use('/empleados', empleados);

app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
});