require("dotenv").config();
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000

const { dbConnection } = require('./src/utils/database.js')
const { errorHandler } = require('./src/middlewares/ApiError.js');
const swaggerDocs = require("./src/utils/swagger.js");
let mainRouter = require('./src/routes/index')()


//init db
dbConnection()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))



app.use(mainRouter)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`API app listening on port ${port}`)

    swaggerDocs(app, port)
})