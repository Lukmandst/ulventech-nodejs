const sqlite = require('sqlite3').verbose()
const { open } = require('sqlite')
const fs = require('fs');


const dbFilePath = './app.sqlite3';
let db = null

const dbConnection = async () => {
    try {

        // Check if the database file exists
        if (!fs.existsSync(dbFilePath)) {
            fs.closeSync(fs.openSync(dbFilePath, 'w'));
            console.log('new local db created');
        }

        const db = await open({
            filename: dbFilePath,
            driver: sqlite.Database
        })
        await createTables(db)
        await checkRoleDB(db)


        db.close()

    } catch (error) {
        console.log(`Database error: ${error.message}`)
    }
}

const dbQuery = async () => {
    try {
        const db = await open({
            filename: dbFilePath,
            driver: sqlite.Database
        })
        return db

    } catch (error) {
        next(error)
    }
}

const createTables = async (db) => {
    try {

        let sql1 = `CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY,
            username varchar not null,
            password varchar not null,
            role_id INTEGER not null,
            datetime TIMESTAMP not null
        )`
        let sql2 = `CREATE TABLE IF NOT EXISTS role (
            id INTEGER PRIMARY KEY,
            name varchar not null,
            datetime TIMESTAMP not null
        )`

        await db.exec(sql1)
        await db.exec(sql2)
    } catch (error) {
        throw (error)
    }
}

const checkRoleDB = async (db) => {
    try {
        // check roles table

        const res = await db.all(`SELECT * from role`)
        if (res.length === 0) {
            const res = await db.run(`INSERT INTO role (name, datetime) VALUES
            ('admin', datetime('now', 'localtime')),
            ('user', datetime('now', 'localtime'))`)
            return { changes: res.changes }
        }

    } catch (error) {
        console.log(error)
    }
}
module.exports = { dbConnection, checkRoleDB, dbQuery }
