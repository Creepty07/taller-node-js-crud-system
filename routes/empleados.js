const express = require('express');
const empleados = express.Router();
const db = require('../db/database.js')

empleados.get('/', async (req, res, next) => {
    const query = 'SELECT * FROM empleados'
    const rows = await db.query(query);
    console.log(rows);

    if (rows.length === 0) {
        return res.status(404).json({message: "No hay empleados registrados", code: 404});
    }
    return res.status(200).json({empleados: rows, code: 200})
});

// BUSCAR EMPLEADOS POR NOMBRE
empleados.get('/:nombre', async (req, res, next) => {
    const { nombre } = req.params;

    const query = `SELECT ID, nombre, apellidos, telefono, correo, direccion FROM empleados WHERE nombre='${nombre}'`;

    const rows = await db.query(query);
    console.log(rows);

    if (rows.length === 0) {
        return res.status(404).json({message: "Not Found", code: 404});
    }
    return res.status(200).json({message: "Empleado encontrado", usuario: rows[0], code: 200});
})

// ELIMINAR EMPLEADO CON EL BODY DEL REQ -> Nombre y apellidos o ID
empleados.delete('/', async (req, res, next) => {
    const { id, nombre, apellidos } = req.body;

    if (!id && !nombre && !apellidos) {
        return res.status(400).json({message: "Faltan parámetros en el request", code: 400});
    }

    let query;

    if (!id) {
         query = `DELETE FROM empleados WHERE nombre='${nombre}' AND apellidos='${apellidos}'`;
    } else {
         query = `DELETE FROM empleados WHERE ID=${id}`;    
    }

    const rows = await db.query(query);
    console.log(rows)

    return res.status(404).json({message: "Empleado no encontrado o eliminado correctamente", code: 404});
})

// MODIFICAR EMPLEADO
empleados.put('/', async (req, res, next) => {
    const { id, nombre, apellidos, telefono, correo, direccion } = req.body;

    if (!id || !nombre || !apellidos || !telefono || !correo || !direccion) {
        return res.status(400).json({message: "Faltan parámetros en el request", code: 400});
    }

    const query = `UPDATE empleados SET nombre='${nombre}',apellidos='${apellidos}',telefono=${telefono},correo='${correo}',direccion='${direccion}' WHERE ID=${id}`

    const rows = await db.query(query);

    if (rows.affectedRows === 1) {
        return res.status(200).json({message: "Empleado modificado correctamente", code: 200});
    }
    return res.status(404).json({message: "Empleado no encontrado", code: 400});
})

// AGREGAR EPLEADOS
empleados.post('/', async (req, res, next) => {
    const { nombre, apellidos, telefono, correo, direccion } = req.body;

    if (!nombre || !apellidos || !telefono || !correo || !direccion) {
        return res.status(400).json({
            message: "Faltan parámetros en el request",
            code: 400
        })
    };

    const query = `INSERT INTO empleados(nombre, apellidos, telefono, correo, direccion) VALUES ('${nombre}','${apellidos}',${telefono},'${correo}','${direccion}')`;

    const rows = await db.query(query);
    console.log(rows);

    if(rows.affectedRows == 1) {
        return res.status(201).json({
            message: "Nuevo empleado agregado",
            code: 201
        })
    }
    return res.status(500).json({
        message: "Ocurrió un error al agregar el empleado",
        code: 500
    })
})

module.exports = empleados;