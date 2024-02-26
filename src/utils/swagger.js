const swaggerui = require('swagger-ui-express')
const fs = require('fs')

const swaggerFile = `${process.cwd()}/docs/index.json`
const swaggerData = fs.readFileSync(swaggerFile, 'utf8')
const swaggerJSON = JSON.parse(swaggerData)
const swaggerDocs = (app, port) => {
   
    app.use('/api-docs', swaggerui.serve, swaggerui.setup(swaggerJSON))

    app.get('docs.json', (req, res) => {
        res.setHeader("Content-Type", "application/json")
        res.send(swaggerJSON)
    })

    console.log(`Docs available at http://localhost:${port}/api-docs`)
}

module.exports = swaggerDocs