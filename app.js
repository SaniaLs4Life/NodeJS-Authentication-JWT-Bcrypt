const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const users = require('./routes/users')
const mongoose = require('./config/database')
const jwt = require('jsonwebtoken')


const app = express()
app.set('secretKey', 'nodeRestAPI')
mongoose.connection.on('error', console.error.bind(console, 'MongoDB Connection Error!'))

app.use(logger('dev'))
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.json({'test': 'First API with NodeJS/Express'})
})
app.use('/users', users)

function validateUser(req, res, next) {
    jwt.verify(req.headers['x-access-token'],
    req.app.get('secretKey'), (err, decoded) => {
        if(err) {
            res.json({status: 'Error', message: err.message, data: null})
        } else {
            req.body.userId = decoded.id
            next()
        }
    })
}
app.use((req, res, next) => {
    let err = new Error('Not Found!')
    err.status = 404
    next(err)
})

app.use((err, req, res, next) => {
    console.log(err)
    if(err.status === 404)
        res.status(404).json({message: 'Not Found!'})
    else
        res.status(500).json({message: 'Something went wrong :( !'})
})

const PORT = 8000
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})