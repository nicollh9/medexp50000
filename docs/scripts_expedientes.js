require('dotenv').config();
const getDb = require('../dao/mongodb');
console.log(process.env.MONGOURI);

const dates = [
    '30/1/2022',
    '3/2/2022',
    '1/8/2022',
    '11/5/2022',
    '9/3/2022'
];

const description = [
    'Dolor de cabeza',
    'Quemadura',
    'Artrosis de rodilla',
    'Gastritis',
    'Dolor de vientre'
];

const observation = [
    'Operacion urgente',
    'Herida leve',
    'Radiografia',
    'Internar durante 3 dias',
    'No grave',
];

const registry = [
    '01',
    '02',
    '03',
    '04',
    '05'
];

const endupdate = [
    '12/1/2022',
    '6/3/2022',
    '2/9/2022',
    '18/4/2022',
    '11/7/2022'
];

const expedientes = 30;
const expedientesArr = [];


for (var i = 0; i < expedientes; i++) {
    const fecha = dates[Math.floor(Math.random() * 5)];
    const descripcion = description[Math.floor(Math.random() * 5)];
    const observacion = observation[Math.floor(Math.random() * 5)];
    const registro = registry[Math.floor(Math.random() * 5)];
    const ultimoActualizacion = endupdate[Math.floor(Math.random() * 5)];

    const doc = {
        fecha,
        descripcion,
        observacion,
        registro,
        ultimoActualizacion
    }
    expedientesArr.push(doc);
}

getDb().then(
    (db) => {
        const expedientes = db.collection('Expedientes');
        expedientes.insertMany(expedientesArr, (err, rslts) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(rslts);
            return;
        });
    }
);