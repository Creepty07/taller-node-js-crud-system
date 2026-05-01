const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const PORT = process.env.PORT;

const app = express();
app.use(morgan);

app.get('/', (req, res, next) => {
    return res.status(200).json({
        message: "Inicio gestor de empleados Node JS S.A de C.V",
        code: 200
    });
});

app.get('/login', (req, res, next) => {
    return res.status(200).json({
        message: "Iniciar sesión en el gestor de empleados",
        code: 200
    });
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});