const express = require('express')
const favicon = require('express-favicon')
const path = require('path')
require('dotenv').config()
const PORT = process.env.PORT || 5001

console.log('PORT IS', PORT)

const app = express()

app.use(favicon(__dirname + '/build/favicon.ico'))
app.use(express.static(path.join(__dirname, 'build')))

app.get('*', (req, res) => {
    res.setHeader('Content-Type', 'text/html')
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(PORT, () => console.log(`Server start on port ${PORT}`))
