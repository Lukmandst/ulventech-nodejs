const { dbQuery } = require("../../../database")

const AuthService = {
    async getUsername(username) {
        try {
            const DB = await dbQuery()
            const res = await DB.all(`SELECT username FROM user WHERE username = $1`, [username])
            DB.close()
            return res
        } catch (error) {
            throw (error)
        }
    },
    async getUserByName(username) {
        try {
            const DB = await dbQuery()
            const res = await DB.all(`SELECT a.id, username, b.name as role_id, password FROM user a
            INNER JOIN role b ON a.role_id = b.id
            WHERE username = $1`, [username])
            DB.close()
            return res[0]
        } catch (error) {
            throw (error)
        }
    },
    async postUsername(body) {
        try {
            const DB = await dbQuery()
            const res = await DB.run(`INSERT INTO user (username, password, role_id, datetime)
            VALUES ($1, $2, $3, datetime('now','localtime'))
            `, [body.username, body.password, body.role_id])
            DB.close()
            return res
        } catch (error) {
            throw (error)
        }
    }
}

module.exports = AuthService