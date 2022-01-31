const getDb = require('../db')
let db = null;
class Pacientes {
    constructor() {
        getDb()
            .then((database) => {
                db = database;
                if (process.env.MIGRATE === 'true') {
                    const createStatement = 'CREATE TABLE IF NOT EXISTS pacientes (id INTEGER PRIMARY KEY AUTOINCREMENT, identidad TEXT, nombre TEXT, apellidos TEXT, email TEXT, telefono TEXT);';
                    db.run(createStatement);
                }
            })
            .catch((err) => { console.error(err) });
    }

/***New***/    
    new(nombre, apellido, identidad, telefono, correo) {
        return new Promise((accept, reject) => {
            db.run(
                'INSERT INTO pacientes (identidad, nombre, apellidos, email, telefono) VALUES(?,?,?,?,?);', [nombre, apellido, identidad, correo, telefono],
                (err, rslt) => {
                    if (err) {
                        console.error(err);
                        reject(err)
                    }
                    accept(rslt);
                }
            )
        })
    }
 
/***All***/
    getAll() {
        return new Promise((accept, reject) => {
            db.all('SELECT * FROM pacientes;', (err, rows) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    accept(rows)
                }
            });
        });
    }

/***By id***/   
    getById(id) {
        return new Promise((accept, reject) => {
            db.get('SELECT * FROM pacientes where id = ?;', [id], (err, row) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    accept(row)
                }
            });
        });
    }

/***Update***/   
    updateOne(id, nombre, apellidos, identidad, telefono, correo) {
        return new Promise((accept, reject) => {
            const sqlUpdate = 'UPDATE pacientes set nombre = ?, apellidos = ?, telefono =  ?, identidad = ? , email = ? where id =?;';
            db.run(
                sqlUpdate, [nombre, apellidos, telefono, identidad, correo, id],
                function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        accept(this)
                    }
                }
            )
        })
    }

/***Delete***/   
    deleteOne(id) {
        return new Promise((accept, reject) => {
            const sqlDelete = 'DELETE from pacientes where id =?;';
            db.run(
                sqlDelete, [id],
                function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        accept(this)
                    }
                }
            )
        })
    }
}

module.exports = Pacientes