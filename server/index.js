const errorHandler = require('./middleware/errorHandlingMiddleware')
const express = require('express')
const sequelize = require('./database')
const models = require('./models/index')
const router = require('./routes/index')
const cors = require('cors')
require('dotenv').config()

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', router)

//app.use(errorHandler)

const start = async() => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => {
            console.log(`Server started on port: ${PORT}`)
        })
    }
    catch(err) {
        console.log(err)
    }
}

start()