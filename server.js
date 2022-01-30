const express = require('express')
const favicon = require('express-favicon')
const path = require('path')
require('dotenv').config()
const PORT = process.env.SERVER_PORT || 5001

const app = express()

app.use(favicon(__dirname + '/build/favicon.ico'))

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(PORT, () => console.log(`Server start on port ${PORT}`))