'use strict'
const express = require('express')
const app = express()
const port = 8000
const host = "localhost"
const date = new Date()

app.listen(port, () => {
        console.log(`Server is listening on http://${host}:${port}`)
})

app.use((req, res, next) => {
        console.log('Time:', date.toISOString())
        next()
})

app.use('/user/:id', (req, res, next) => {
        console.log('Request Type:', req.method)
        next()
})

app.get('/user/:id', (req, res, next) => {
        res.send('USER')
})

app.use('/user/:id', (req, res, next) => {
        console.log('Request URL:', req.originalUrl)
        next()
}, (req, res, next) => {
        console.log('Request Type:', req.method)
        next()
})

app.get('user/:id', (req, res, next) => {
        if (req.params.id === '0') next('route')
        else next()
}, (req, res, next) => {
        res.send('regular')
})

app.get('/user/:id', (req, res, next) => {
        res.send('special')
})
