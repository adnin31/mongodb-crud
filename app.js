const express = require ('express')
const app = express()
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

var books = require('./routers/books.js')

app.use('/books',books)

app.listen(3000)
