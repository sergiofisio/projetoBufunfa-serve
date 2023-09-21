require('dotenv').config()
const express = require('express')
const cors = require('cors')


const app = express()

app.use(cors())
app.use(express.json())

app.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT || 3000}`)
})