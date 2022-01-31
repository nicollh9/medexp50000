const sqlit3 = require('sqlite3')
let db = null;

const initDB = () => {
    return new Promise((accept, reject) => {
        let database = new sqlit3.Database(
            //'../data/medexp.sqlite3',
            `./data/${process.env.DB_FILENAME}.sqlite3`,
            (err) => {
                if (err) {
                    console.error();
                    (err);
                    reject(err)
                }
                accept(database);
            }
        );
    });
}


const singletonGetDB = async() => {
    if (!db) {
        db = await initDB();
    }
    return db;
}

const singletonGetDBnoPromise = () => {
    if (!db) {
        initDB()
            .then((database) => { db = database; })
            .catch((err) => { throw Error('Error de la base de datos') });
    }
    return db;
}

module.exports = singletonGetDB;